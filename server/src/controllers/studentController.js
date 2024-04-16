import GradeClassType from '../models/GradeClassType.js';
import StudentTeacherSelection from '../models/StudentTeacherSelection.js';
import User from '../models/User.js';
import Teachers from '../models/User.js';
import Lesson from '../models/Lesson.js';
import LessonSection from '../models/LessonSection.js';

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
async function populateSections(sections) {
  for (let i = 0; i < sections.length; i++) {
    const childSections = await LessonSection.find({
      parentSection: sections[i]._id,
    }).populate('sectionContents');

    // Convert child sections to plain objects if they are Mongoose documents
    sections[i].childSections = childSections.map((cs) =>
      cs.toObject ? cs.toObject() : cs,
    );

    // Recursively populate child sections
    if (sections[i].childSections.length > 0) {
      await populateSections(sections[i].childSections);
    }
  }
}

export const getAllRegisteredLessons = async (req, res) => {
  try {
    const selections = await StudentTeacherSelection.find({
      student: req.userId,
    })
      .populate('teacher')
      .populate('grade')
      .populate('classType');

    const lessons = await Promise.all(
      selections.map(async (selection) => {
        let lesson = await Lesson.findOne({
          user: selection.teacher._id,
          grade: selection.grade._id,
          classType: selection.classType._id,
        }).populate({
          path: 'lessonSections',
          match: { parentSection: null },
          populate: { path: 'sectionContents' },
        });

        if (lesson) {
          lesson = lesson.toObject(); // Convert to JS object
          await populateSections(lesson.lessonSections);
          return lesson; // Now lesson includes populated child sections
        }
        return null;
      }),
    );
    console.log('lessons', lessons);
    res.json({
      success: true,
      data: lessons.filter((lesson) => lesson !== null),
    });
  } catch (error) {
    console.error('Error fetching registered lessons:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};
