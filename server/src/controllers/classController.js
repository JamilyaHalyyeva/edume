import Class from '../models/Class.js';

export const handleGetClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
