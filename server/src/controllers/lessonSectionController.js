import Lesson from '../models/Lesson.js';
import LessonSection from '../models/LessonSection.js';

// Get all lesson sections
export const hanleGetLessonSections = async (req, res) => {
  try {
    const lessonSections = await LessonSection.find();
    res.json({ success: true, lessonSections: lessonSections });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Get a lesson section by ID
export const handleGetLessonSectionById = async (req, res) => {
  try {
    const lessonSectionId = req.params.lessonSectionId;
    const lessonSection = await LessonSection.findById(lessonSectionId);
    if (!lessonSection) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson section not found' });
    }
    res.json({ success: true, lessonSection: lessonSection });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Create a new lesson section
export const handlePostLessonSection = async (req, res) => {
  console.log('handlePostLessonSection->req.body: ', req.body);
  try {
    const { name, order, lesson } = req.body;
    const lessonSection = new LessonSection({ name, order, lesson });
    const savedLessonSection = await lessonSection.save();

    console.log('savedLessonSection: ', savedLessonSection);
    // Find the corresponding Lesson document and update it by pushing the new LessonSection's ID to its lessonSections array
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lesson,
      { $push: { lessonSections: savedLessonSection._id } },
      { new: true }, // Return the modified document rather than the original by default
    );
    console.log('updatedLesson: ', updatedLesson);
    res.json({ success: true, lessonSection: lessonSection });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Update a lesson section
export const handlePatchLessonSection = async (req, res) => {
  try {
    const lessonSectionId = req.params.lessonSectionId;
    const { name, order, lesson } = req.body;
    const updatedLessonSection = await LessonSection.findByIdAndUpdate(
      lessonSectionId,
      { name, order, lesson },
      { new: true },
    );
    if (!updatedLessonSection) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson section not found' });
    }
    res.json({ success: true, lessonSection: updatedLessonSection });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
// Delete a lesson section
export const handleDeleteLessonSection = async (req, res) => {
  try {
    const lessonSectionId = req.params.lessonSectionId;
    const deletedLessonSection =
      await LessonSection.findByIdAndDelete(lessonSectionId);
    if (!deletedLessonSection) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson section not found' });
    }
    res.json({ success: true, message: 'Lesson section deleted successfully' });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
