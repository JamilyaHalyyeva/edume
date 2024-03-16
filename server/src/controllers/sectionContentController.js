import SectionContent from '../models/SectionContent';

// Get all section contents
export const handleGetSectionContents = async (req, res) => {
  try {
    const sectionContents = await SectionContent.find();
    res.json({ success: true, sectionContents: sectionContents });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

// Get a section content by ID
export const handleGetSectionContentById = async (req, res) => {
  try {
    const sectionContentId = req.params.sectionContentId;
    const sectionContent = await SectionContent.findById(sectionContentId);
    if (!sectionContent) {
      return res
        .status(404)
        .json({ success: false, message: 'Section content not found' });
    }
    res.json({ success: true, sectionContent: sectionContent });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

// Create a new section content
export const handlePostSectionContent = async (req, res) => {
  try {
    const { videoUrl, documentUrl, lessonSection, order } = req.body;
    const sectionContent = new SectionContent({
      videoUrl,
      documentUrl,
      lessonSection,
      order,
    });
    await sectionContent.save();
    res.json({ success: true, sectionContent: sectionContent });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

// Update a section content
export const handlePatchSectionContent = async (req, res) => {
  try {
    const sectionContentId = req.params.sectionContentId;
    const { videoUrl, documentUrl, lessonSection, order } = req.body;
    const updatedSectionContent = await SectionContent.findByIdAndUpdate(
      sectionContentId,
      { videoUrl, documentUrl, lessonSection, order },
      { new: true },
    );
    if (!updatedSectionContent) {
      return res
        .status(404)
        .json({ success: false, message: 'Section content not found' });
    }
    res.json({ success: true, sectionContent: updatedSectionContent });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

// Delete a section content
export const handleDeleteSectionContent = async (req, res) => {
  try {
    const sectionContentId = req.params.sectionContentId;
    const deletedSectionContent =
      await SectionContent.findByIdAndDelete(sectionContentId);
    if (!deletedSectionContent) {
      return res
        .status(404)
        .json({ success: false, message: 'Section content not found' });
    }
    res.json({
      success: true,
      message: 'Section content deleted successfully',
    });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
