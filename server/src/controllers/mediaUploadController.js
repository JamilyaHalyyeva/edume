export const handleUpload = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    return res
      .status(200)
      .json({ message: 'File uploaded successfully', fileInfo: file });
  } catch (error) {
    console.error('Error uploading file', error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
};
