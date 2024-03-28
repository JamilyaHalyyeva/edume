import Grade from '../models/Grade.js';
import GradeClassType from '../models/GradeClassType.js';

export const handleGetGradeClassTypes = async (req, res) => {
  try {
    const gradeClassTypes = req.grade
      ? await GradeClassType.find({ grade: req.grade })
      : await GradeClassType.find().populate('classType').populate('grade');
    console.log('gradeClassTypes:', gradeClassTypes);
    res.json(gradeClassTypes);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
