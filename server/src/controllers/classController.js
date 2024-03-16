import ClassType from '../models/ClassType.js';

export const handleGetClasses = async (req, res) => {
  try {
    const classTypes = await ClassType.find();
    res.json(classTypes);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
