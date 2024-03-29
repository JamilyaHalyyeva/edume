import Lesson from '../models/Lesson.js';

export const handleGetLessons = async (req, res) => {
  try {
    console.log('req.grade:', req.grade);
    const lessons = await Lesson.find({ grade: req.grade });
    res.json({ success: true, lessons: lessons });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

export const handlePostLesson = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, grade, classType, order } = req.body;
    const lesson = new Lesson({
      name,
      order,
      grade,
      classType,
      userId,
    });
    await lesson.save();
    res.json({ success: true, lesson: lesson });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Get a single lesson
export const handleGetLessonById = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson not found' });
    }
    res.json({ success: true, lesson: lesson });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Update a lesson
export const handlePatchLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const { name, grade, classType, order } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { name, grade, classType, order },
      { new: true },
    );
    if (!updatedLesson) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson not found' });
    }
    res.json({ success: true, lesson: updatedLesson });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Delete a lesson
export const handleDeleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson not found' });
    }
    res.json({ success: true, message: 'Lesson deleted successfully' });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
