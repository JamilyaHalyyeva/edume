import mongoose from 'mongoose';
import config from './env.config.js';
import Class from '../models/Class.js';
import Grade from '../models/Grade.js';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(config.dbUri);
    console.log('successful connected to DB');
    initializeData();
  } catch (error) {
    console.log('error connecting to db', error.message);
  }
}

async function initializeData() {
  try {
    // Clear existing data in Class and Grades collections
    await Class.deleteMany();
    await Grade.deleteMany();

    // Insert initial data
    await Class.insertMany([
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

      // Add more classes as needed
    ]);

    const gradesData = Array.from({ length: 14 }, (_, i) => ({ name: i + 1 }));
    await Grade.insertMany(gradesData);

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}
