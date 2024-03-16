import Grade from '../models/Grade.js';

export const handleGetGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
