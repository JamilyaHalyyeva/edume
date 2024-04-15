import GradeClassType from '../models/GradeClassType.js';
import StudentTeacherSelection from '../models/StudentTeacherSelection.js';
import User from '../models/User.js';
import Teachers from '../models/User.js';

export const getUnregistedClassTypes = async (req, res) => {
  try {
    const userId = req.userId;
    const gradeId = req.grade;

    // Get all class types that the user gets
    const classTypesThatUserGets = await GradeClassType.find({
      grade: gradeId,
    })
      .populate('classType')
      .populate('grade');
    // Get all class types that the user is already registered in
    const classTypesThatUserIsRegistered = await StudentTeacherSelection.find({
      student: userId,
      grade: gradeId,
    });

    // Filter out the class types that the user is already registered in
    const unregisteredClassTypes = classTypesThatUserGets.filter(
      (classType) => {
        return !classTypesThatUserIsRegistered.some(
          (registeredClassType) =>
            registeredClassType.classType.toString() ===
            classType._id.toString(),
        );
      },
    );
    res.json(unregisteredClassTypes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTeacherListByClassTypeAndGrade = async (req, res) => {
  try {
    const gradeId = req.grade;
    const teachers = await User.find({
      role: 'teacher',
      teacherClassTypeGrades: {
        $elemMatch: {
          grade: gradeId,
          classType: req.params.classTypeId,
        },
      },
    })
      .populate('teacherClassTypeGrades.classType')
      .populate('teacherClassTypeGrades.grade');
    res.json(teachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Check if student is registered in all teachers
//returns true if all teachers are registered
export const getIsStudentRegisteredAllTeachers = async (req, res) => {
  try {
    const userId = req.userId;
    const gradeId = req.grade;

    // Get all class types that the user gets
    const classTypesThatUserGets = await GradeClassType.find({
      grade: gradeId,
    })
      .populate('classType')
      .populate('grade');
    console.log('classTypesThatStudentGets ', classTypesThatUserGets);
    // Get all class types that the user is already registered in
    const classTypesThatUserIsRegistered = await StudentTeacherSelection.find({
      student: userId,
      grade: gradeId,
    });
    console.log(
      'classTypesThatUserIsRegistered ',
      classTypesThatUserIsRegistered,
    );
    // Filter out the class types that the user is already registered in
    const isAllClassTypesRegistered =
      classTypesThatUserGets.length === classTypesThatUserIsRegistered.length;
    res.json(isAllClassTypesRegistered);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Register selected teachers
export const registerSelectedTeachers = async (req, res) => {
  try {
    const userId = req.userId;
    const gradeId = req.grade._id;
    const { selectedTeachers } = req.body;
    const studentTeacherSelections = [];
    selectedTeachers.forEach((selectedTeacher) => {
      studentTeacherSelections.push({
        student: userId,
        teacher: selectedTeacher.teacherId,
        classType: selectedTeacher.classTypeId,
        grade: gradeId,
      });
    });
    const registeredTeachers = await StudentTeacherSelection.insertMany(
      studentTeacherSelections,
    );
    res.json(registeredTeachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
