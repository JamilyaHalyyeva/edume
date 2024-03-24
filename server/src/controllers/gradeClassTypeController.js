import Grade from '../models/Grade.js';
import GradeClassType from '../models/GradeClassType.js';

export const handleGetGradeClassTypes = async (req, res) => {
  try {
    console.log('req.grade:', req.grade);
    const grade = await Grade.findOne({ name: '2' });
    console.log('grade:', grade);
    const gradeClassTypes = await GradeClassType.find({ grade: req.grade })
      .populate('classType')
      .populate('grade');
    console.log('gradeClassTypes:', gradeClassTypes);
    res.json(gradeClassTypes);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
