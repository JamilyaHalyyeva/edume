import SectionContent from '../models/SectionContent.js';

export const handleVideoUpload = async (req, res) => {
  try {
    const { file } = req;
    const { lessonId, sectionId } = req.params;
    const { title, description, type } = req.body; // Extract additional fields from the request body

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Basic validation for required fields
    if (!title || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('file :>> ', file);
    console.log('lessonId :>> ', lessonId);
    console.log('sectionId :>> ', sectionId);
    console.log('title :>> ', title);
    console.log('description :>> ', description);
    console.log('type :>> ', type);

    // Create a new SectionContent object
    const newContent = new SectionContent({
      title,
      description,
      url: file.path,
      type,
      order: Number.MAX_SAFE_INTEGER, // You might want to handle order more dynamically
      lessonSection: sectionId,
    });

    // Save the new content to the database
    const savedContent = await newContent.save();

    return res.status(200).json({
      message: 'File uploaded successfully',
      data: savedContent,
    });
  } catch (error) {
    console.error('Error uploading file', error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
};
