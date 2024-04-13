import mongoose from 'mongoose';
import config from './env.config.js';
import ClassType from '../models/ClassType.js';
import Grade from '../models/Grade.js';
import GradeClassType from '../models/GradeClassType.js';
import User from '../models/User.js';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(config.dbUri);
    console.log('successful connected to DB');
    if (config.seedData === 'true') initializeData();
  } catch (error) {
    console.log('error connecting to db', error.message);
  }
}

async function initializeData() {
  try {
    // Insert initial data
    const classTypes = await ClassType.insertMany([
      { name: 'Math' },
      { name: 'Physics' },
      { name: 'Chemistry' },
      { name: 'Biology' },
      { name: 'Music' },
      { name: 'Geography' },
      { name: 'History' },
      { name: 'English' },
      { name: 'German' },
      { name: 'French' },
      { name: 'Latin' },

      // Add more classTypes as needed
    ]);

    const gradesData = Array.from({ length: 13 }, (_, i) => ({ name: i + 1 }));
    const grades = await Grade.insertMany(gradesData);

    // Define default mappings between grades and class types
    const defaultMappings = [];

    grades.forEach((grade, index) => {
      defaultMappings.push({
        grade: grade._id,
        classType: classTypes[0]._id,
      }); // Math
      defaultMappings.push({
        grade: grade._id,
        classType: classTypes[8]._id,
      }); // German
      if (index >= 4 && index <= 12) {
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[1]._id,
        }); // Physics
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[3]._id,
        }); // Biology
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[4]._id,
        }); // Music
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[5]._id,
        }); // Geography
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[6]._id,
        }); // History
      }
      if (index >= 0 && index <= 4) {
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[9]._id,
        }); // Spanish
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[10]._id,
        }); // Latin
      }
      if (index >= 5 && index <= 12) {
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[2]._id,
        }); // Chemistry
      }
      if (index >= 0 && index <= 6) {
        defaultMappings.push({
          grade: grade._id,
          classType: classTypes[7]._id,
        }); // English
      }
    });

    // Insert default mappings into GradeClassType
    await GradeClassType.insertMany(defaultMappings);

    const savedGradeClassTypes = await GradeClassType.find()
      .populate('grade')
      .populate('classType');

    //Teacher data
    const teachers = [
      {
        username: 'John',
        surname: 'Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher3.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Math',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Physics',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Chemistry',
          ),
        ],
      },
      {
        username: 'Jane',
        surname: 'Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher1.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Biology',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Music',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Geography',
          ),
        ],
      },
      {
        username: 'Michael',
        surname: 'Smith',
        email: 'michaelsmith@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher4.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'History',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'English',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'German',
          ),
        ],
      },
      {
        username: 'Emily',
        surname: 'Brown',
        email: 'emilybrown@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher2.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'French',
          ),
          ...savedGradeClassTypes.filter(
            (gct) => gct.classType.name === 'Latin',
          ),
        ],
      },
      {
        username: 'Max',
        surname: 'Mustermann',
        email: 'maxmustermann@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher5.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter((gct) =>
            ['1', '2', '3', '4'].includes(gct.grade.name),
          ),
        ],
      },
      {
        username: 'Maria',
        surname: 'Musterfrau',
        email: 'mariamusterfrau@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher8.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter((gct) =>
            ['1', '2', '3', '4'].includes(gct.grade.name),
          ),
        ],
      },
      {
        username: 'Alex',
        surname: 'Schmidt',
        email: 'alexschmidt@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher6.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) =>
              ['5', '6', '7', '8'].includes(gct.grade.name) &&
              ['Physics', 'Biology', 'Chemistry'].includes(gct.classType.name),
          ),
        ],
      },
      {
        username: 'Anna',
        surname: 'Schneider',
        email: 'annaschneider@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher9.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) =>
              ['5', '6', '7', '8'].includes(gct.grade.name) &&
              ['Physics', 'Biology', 'Chemistry'].includes(gct.classType.name),
          ),
        ],
      },
      {
        username: 'Peter',
        surname: 'Müller',
        email: 'petermuller@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher3.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) =>
              ['5', '6', '7', '8'].includes(gct.grade.name) &&
              ['Geography', 'History', 'Latin'].includes(gct.classType.name),
          ),
        ],
      },
      {
        username: 'Mary',
        surname: 'Schulz',
        email: 'maryschulz@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher9.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) =>
              ['5', '6', '7', '8'].includes(gct.grade.name) &&
              ['Geography', 'History', 'Latin'].includes(gct.classType.name),
          ),
        ],
      },
      {
        username: 'David',
        surname: 'Merkel',
        email: 'davidmerkel@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher3.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter(
            (gct) =>
              ['5', '6', '7', '8'].includes(gct.grade.name) &&
              ['English', 'French', 'German'].includes(gct.classType.name),
          ),
        ],
      },
      {
        username: 'David',
        surname: 'Fischer',
        email: 'davidfischer@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher7.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter((gct) =>
            ['9', '10', '11', '12', '13'].includes(gct.grade.name),
          ),
        ],
      },
      {
        username: 'Sophie',
        surname: 'Weber',
        email: 'sophieweber@gmail.com',
        password: '123456',
        role: 'teacher',
        avatar: 'teacher10.png',
        teacherClassTypeGrades: [
          ...savedGradeClassTypes.filter((gct) =>
            ['9', '10', '11', '12', '13'].includes(gct.grade.name),
          ),
        ],
      },
    ];

    await User.insertMany(teachers);

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}
