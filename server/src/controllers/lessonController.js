import Lesson from '../models/Lesson.js';
import LessonSection from '../models/LessonSection.js';
async function populateSections(sections) {
  try {
    for (let i = 0; i < sections.length; i++) {
      // Ensure the object is a Mongoose document before converting
      if (typeof sections[i].toObject === 'function') {
        sections[i] = sections[i].toObject();
      }

      //get sectionContents for the parent section itself
      const sectionContents = await LessonSection.findById(
        sections[i]._id,
      ).populate('sectionContents');
      sections[i].sectionContents = sectionContents.sectionContents;

      const childSections = await LessonSection.find({
        parentSection: sections[i]._id,
      }).populate('sectionContents');

      // Convert child sections to objects if necessary
      sections[i].childSections = childSections.map((cs) =>
        cs.toObject ? cs.toObject() : cs,
      );

      console.log(
        `Populating for section ${sections[i]._id}: Found ${childSections.length} child sections`,
      );
      await populateSections(sections[i].childSections); // Recursively populate child sections
    }
  } catch (error) {
    console.error('Error populating sections:', error);
  }
}

export const handleGetLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ user: req.userId })
      .populate('grade')
      .populate('classType')
      .populate({
        path: 'lessonSections',
        match: { parentSection: null },
        populate: { path: 'sectionContents' }, // Ensuring deep population from the start might help
      });

    // Convert lessons to objects for manipulation
    const lessonsWithPopulatedSections = lessons.map((lesson) => {
      const lessonObj = lesson.toObject();
      return populateSections(lessonObj.lessonSections).then(() => lessonObj); // Ensure the async population is completed
    });

    // Wait for all lessons to be processed
    Promise.all(lessonsWithPopulatedSections)
      .then((completedLessons) =>
        res.json({ success: true, lessons: completedLessons }),
      )
      .catch((error) => {
        console.error('Error processing lessons:', error);
        return res.status(500).send({ success: false, error: error.message });
      });
  } catch (error) {
    console.error('Error retrieving lessons:', error);
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
    const lesson = await Lesson.findById(lessonId)
      .populate('grade')
      .populate('classType')
      .populate({
        path: 'lessonSections',
        match: { parentSection: null }, // Only get top-level sections
        populate: {
          path: 'sectionContents',
          select: 'name videoUrl documentUrl',
        },
      });

    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson not found' });
    }

    // Convert lesson to plain object to manipulate
    const lessonObject = lesson.toObject();

    // Recursively populate each top-level section
    await populateSections(lessonObject.lessonSections);

    res.json({ success: true, lesson: lessonObject });
  } catch (error) {
    console.error('Error retrieving lesson:', error);
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
