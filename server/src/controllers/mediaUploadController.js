import LessonSection from '../models/LessonSection.js';
import SectionContent from '../models/SectionContent.js';

export const handleVideoUpload = async (req, res) => {
  try {
    console.log('starting save video');
    const { file } = req;
    const { lessonId, sectionId } = req.params;
    const { title, description, type, order } = req.body; // Extract additional fields from the request body
    console.log('file :>> ', file);
    console.log('lessonId :>> ', lessonId);
    console.log('sectionId :>> ', sectionId);
    console.log('title :>> ', title);
    console.log('description :>> ', description);
    console.log('type :>> ', type);
    console.log('order :>> ', order);

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Basic validation for required fields
    if (!title || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('starting saving process for metadata');
    // Create a new SectionContent object
    const newContent = new SectionContent({
      title,
      description,
      url: file.path,
      type,
      order: 0, // todo: wee need to get this data from the client side
      lessonSection: sectionId,
    });

    // Save the new content to the database
    const savedContent = await newContent.save();

    //after saving content we need to update the section with the new content
    const section = await LessonSection.findById(sectionId);
    section.sectionContents.push(savedContent._id);
    await section.save();

    return res.status(200).json({
      message: 'File uploaded successfully',
      data: savedContent,
    });
  } catch (error) {
    console.error('Error uploading file', error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
};
