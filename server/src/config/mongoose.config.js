import mongoose from 'mongoose';
import config from './env.config.js';
import ClassType from '../models/ClassType.js';
import Grade from '../models/Grade.js';
import GradeClassType from '../models/GradeClassType.js';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(config.dbUri);
    console.log('successful connected to DB');
    if (config.seedData === true) initializeData();
  } catch (error) {
    console.log('error connecting to db', error.message);
  }
}

async function initializeData() {
  try {
    // Clear existing data in ClassTypes and Grades collections
    await ClassType.deleteMany();
    await Grade.deleteMany();
    await GradeClassType.deleteMany();
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
      { name: 'Spanish' },
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

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}
