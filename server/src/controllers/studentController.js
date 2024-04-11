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
