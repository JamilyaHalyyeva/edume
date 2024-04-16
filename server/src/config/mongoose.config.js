import mongoose from 'mongoose';
import config from './env.config.js';
import ClassType from '../models/ClassType.js';
import Grade from '../models/Grade.js';
import GradeClassType from '../models/GradeClassType.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import Lesson from '../models/Lesson.js';
import LessonSection from '../models/LessonSection.js';
import SectionContent from '../models/SectionContent.js';

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
    const password = '123456';
    //Teacher data
    const teachers = [
      {
        username: 'John',
        surname: 'Doe',
        email: 'johndoe@gmail.com',
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
        password: await bcrypt.hash(password, 12),
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
    console.log('Teachers are initialized successfully');
    console.log(
      'Teachers : ',
      teachers.map((teacher) => teacher.email).join(', '),
    );

    const teacher = await User.findOne({ email: 'johndoe@gmail.com' })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');
    await createMathLessonsRegardingTeachersGrades(teacher);
    const teacher2 = await User.findOne({ email: 'maxmustermann@gmail.com' })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');
    await createMathLessonsRegardingTeachersGrades(teacher2);

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// returns a Lesson structure with section, subsections and sectionContent populated
//data structure fits to Lesson model in server/src/models/Lesson.js and
//LessonSection model in server/src/models/LessonSection.js and
//LessonSectionContent model in server/src/models/LessonSectionContent.js
//section names must be logical and fit the lesson content
// for example if we are creating Lesson list for 4th grade Math, section names could be
// 'Addition', 'Subtraction', 'Multiplication', 'Division'
// subsection names could be 'Whole Numbers', 'Fractions', 'Decimals' etc.
// and grade and Classtype must be queried from mongoose models
async function createMathLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Math lessons for teacher:', teacher);
  try {
    const mathClassType = await ClassType.findOne({ name: 'Math' });
    const grades = teacher.teacherClassTypeGrades
      .map((gct) => gct.grade)
      .reduce((acc, grade) => {
        if (!acc.find((g) => g._id.toString() === grade._id.toString())) {
          acc.push(grade);
        }
        return acc;
      }, []);

    const topics = {
      1: [
        {
          main: 'Introduction to Numbers',
          subtopics: ['Counting', 'Number Recognition', 'Basic Addition'],
        },
        {
          main: 'Shapes and Spaces',
          subtopics: [
            'Identifying Shapes',
            'Understanding Sizes',
            'Spatial Awareness',
          ],
        },
      ],
      2: [
        {
          main: 'Operations and Algebraic Thinking',
          subtopics: ['Addition and Subtraction', 'Word Problems', 'Patterns'],
        },
        {
          main: 'Money and Time',
          subtopics: ['Understanding Money', 'Telling Time', 'Using Calendars'],
        },
      ],
      3: [
        {
          main: 'Multiplication and Division',
          subtopics: [
            'Multiplication Facts',
            'Basic Division',
            'Problem Solving',
          ],
        },
        {
          main: 'Fractions',
          subtopics: [
            'Understanding Fractions',
            'Fraction Addition',
            'Fraction Subtraction',
          ],
        },
      ],
      4: [
        {
          main: 'Advanced Multiplication and Division',
          subtopics: [
            'Multi-digit Multiplication',
            'Long Division',
            'Factor Pairs',
          ],
        },
        {
          main: 'Decimals and Fractions',
          subtopics: [
            'Decimal Concepts',
            'Comparing Decimals',
            'Decimal Operations',
          ],
        },
      ],
      5: [
        {
          main: 'Geometry',
          subtopics: ['Coordinate Planes', 'Volume', 'Properties of Shapes'],
        },
        {
          main: 'Measurement and Data',
          subtopics: [
            'Data Representation',
            'Measurement Conversions',
            'Calculating Volume',
          ],
        },
      ],
      6: [
        {
          main: 'Ratios and Proportional Relationships',
          subtopics: [
            'Understanding Ratios',
            'Ratio Reasoning',
            'Rate Problems',
          ],
        },
        {
          main: 'The Number System',
          subtopics: [
            'Dividing Fractions',
            'Multiplying Decimals',
            'Negative Numbers',
          ],
        },
      ],
      7: [
        {
          main: 'Expressions and Equations',
          subtopics: [
            'Simplifying Expressions',
            'Linear Equations',
            'Inequalities',
          ],
        },
        {
          main: 'Probability and Statistics',
          subtopics: [
            'Probability Models',
            'Analysis of Data',
            'Measures of Center and Variability',
          ],
        },
      ],
      8: [
        {
          main: 'Functions',
          subtopics: [
            'Defining Functions',
            'Comparing Functions',
            'Use of Functions',
          ],
        },
        {
          main: 'Geometry and Volume',
          subtopics: [
            'The Pythagorean Theorem',
            'Distance in the Coordinate Plane',
            'Cylinder Volume',
          ],
        },
      ],
      9: [
        {
          main: 'Algebra I',
          subtopics: [
            'Linear Equations',
            'Quadratic Functions',
            'Exponential Functions',
          ],
        },
        {
          main: 'Foundations in Geometry',
          subtopics: ['Proofs', 'Congruence', 'Transformations'],
        },
      ],
      10: [
        {
          main: 'Algebra II',
          subtopics: [
            'Polynomial Functions',
            'Rational Exponents',
            'Complex Numbers',
          ],
        },
        {
          main: 'Advanced Geometry',
          subtopics: [
            'Circle Theorems',
            'Constructions',
            'Trigonometry Basics',
          ],
        },
      ],
      11: [
        {
          main: 'Pre-Calculus',
          subtopics: [
            'Sequences and Series',
            'Probability and Combinatorics',
            'Trigonometric Functions',
          ],
        },
        {
          main: 'Statistics',
          subtopics: [
            'Descriptive Statistics',
            'Probability Distributions',
            'Regression Analysis',
          ],
        },
      ],
      12: [
        {
          main: 'Calculus',
          subtopics: ['Limits and Continuity', 'Derivatives', 'Integrals'],
        },
        {
          main: 'Advanced Probability',
          subtopics: [
            'Conditional Probability',
            'Distributions',
            'Statistical Inference',
          ],
        },
      ],
      13: [
        {
          main: 'Advanced Calculus',
          subtopics: [
            'Integral Calculus',
            'Differential Calculus',
            'Application Problems',
          ],
        },
        {
          main: 'Probability and Statistics',
          subtopics: [
            'Advanced Probability',
            'Statistics',
            'Data Interpretation',
          ],
        },
      ],
    };

    for (const grade of grades) {
      const gradeLevel = grade.name;
      const lessonName = 'Math Curriculum';
      const lesson = new Lesson({
        name: lessonName,
        order: parseInt(gradeLevel),
        grade: grade._id,
        classType: mathClassType._id,
        user: teacher._id,
      });

      await lesson.save();

      let order = 1;
      for (const topic of topics[gradeLevel]) {
        const section = new LessonSection({
          name: topic.main,
          order: order++,
          lesson: lesson._id,
        });

        await section.save();

        let subsectionOrder = 1;
        for (const subtopic of topic.subtopics) {
          const subsection = new LessonSection({
            name: subtopic,
            order: subsectionOrder++,
            lesson: lesson._id,
            parentSection: section._id, // Assuming the schema supports hierarchical structuring
          });

          const content = new SectionContent({
            videoUrl: 'https://youtu.be/CWeURo9iA3g?si=YFq_Tv93tjd31rrQ', //  `https://example.com/video/${subtopic.replace(/ /g, '')}`,
            documentUrl:
              'https://file-examples.com/storage/feed2327706616bd9a07caa/2017/10/file-sample_150kB.pdf', //`https://example.com/doc/${subtopic.replace(/ /g, '')}.pdf`,
            order: 1,
            lessonSection: subsection._id,
          });

          await content.save();
          subsection.sectionContents = [content._id];
          await subsection.save();
          section.subSections = (section.subSections || []).concat([
            subsection._id,
          ]);
        }

        await section.save();
        lesson.lessonSections = (lesson.lessonSections || []).concat([
          section._id,
        ]);
      }

      await lesson.save();
      console.log(
        `Detailed Math lesson for Grade ${gradeLevel} created successfully.`,
      );
    }

    console.log('All detailed Math lessons have been created across grades.');
  } catch (error) {
    console.error('Error in creating detailed Math lessons:', error);
  }
}
