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
      const lessonName = `Math Curriculum Grade ${gradeLevel}`;
      const lesson = new Lesson({
        name: lessonName,
        order: parseInt(gradeLevel, 10),
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

        // Creating a main section content for video
        const mainSectionVideoContent = new SectionContent({
          title: `Overview of ${topic.main}`,
          description: `Detailed video overview of ${topic.main}`,
          url: 'https://res.cloudinary.com/jamilyaedume/video/upload/v1713280780/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/1713280777106-math%20%281%29%20%281%29.mp4.mp4',
          type: 'video',
          order: 1,
          lessonSection: section._id,
        });

        await mainSectionVideoContent.save();

        // Creating a main section content for PDF
        const mainSectionPDFContent = new SectionContent({
          title: `PDF Summary of ${topic.main}`,
          description: `Detailed PDF summary of ${topic.main}`,
          url: 'https://file-examples.com/storage/feed2327706616bd9a07caa/2017/10/file-sample_150kB.pdf',
          type: 'pdf',
          order: 2,
          lessonSection: section._id,
        });

        await mainSectionPDFContent.save();

        section.sectionContents = [
          mainSectionVideoContent._id,
          mainSectionPDFContent._id,
        ];
        await section.save();

        let subsectionOrder = 1;
        for (const subtopic of topic.subtopics) {
          const subsection = new LessonSection({
            name: subtopic,
            order: subsectionOrder++,
            parentSection: section._id,
            lesson: lesson._id,
          });

          await subsection.save();

          // Video content for subsection
          const subsectionVideoContent = new SectionContent({
            title: `Learn about ${subtopic}`,
            description: `${subtopic} explained in detail.`,
            url: 'https://res.cloudinary.com/jamilyaedume/video/upload/v1713280780/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/1713280777106-math%20%281%29%20%281%29.mp4.mp4',
            type: 'video',
            order: 1,
            lessonSection: subsection._id,
          });

          await subsectionVideoContent.save();

          // PDF content for subsection
          const subsectionPDFContent = new SectionContent({
            title: `PDF details on ${subtopic}`,
            description: `${subtopic} in PDF format.`,
            url: 'https://file-examples.com/storage/feed2327706616bd9a07caa/2017/10/file-sample_150kB.pdf',
            type: 'pdf',
            order: 2,
            lessonSection: subsection._id,
          });

          await subsectionPDFContent.save();

          subsection.sectionContents = [
            subsectionVideoContent._id,
            subsectionPDFContent._id,
          ];
          await subsection.save();

          section.subSections = (section.subSections || []).concat(
            subsection._id,
          );
        }

        await section.save();
        lesson.lessonSections = (lesson.lessonSections || []).concat(
          section._id,
        );
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

async function createPhysicsLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Physics lessons for teacher:', teacher);
  try {
    const physicsClassType = await ClassType.findOne({ name: 'Physics' });
    const grades = teacher.teacherClassTypeGrades
      .map((gct) => gct.grade)
      .reduce((acc, grade) => {
        if (!acc.find((g) => g._id.toString() === grade._id.toString())) {
          acc.push(grade);
        }
        return acc;
      }, []);

    const topics = {
      4: [
        {
          main: 'Introduction to Physics',
          subtopics: [
            'Introduction to Science and Physics',
            'Scientific Method',
            'Units and Measurements',
          ],
        },
        {
          main: 'Mechanics',
          subtopics: [
            'Scalars and Vectors',
            'Motion in One Dimension',
            "Newton's Laws of Motion",
            "Applications of Newton's Laws",
            'Circular Motion and Gravitation',
          ],
        },
        {
          main: 'Energy and Momentum',
          subtopics: [
            'Work and Energy',
            'Conservation of Energy',
            'Systems of Particles and Conservation of Momentum',
          ],
        },
        {
          main: 'Heat and Temperature',
          subtopics: [
            'Temperature and Heat',
            'Heat Transfer',
            'Thermal Properties of Matter',
          ],
        },
        {
          main: 'Electricity and Magnetism',
          subtopics: [
            'Electric Charge and Electric Field',
            'Electric Current',
            'Circuits',
            'Magnetism and Electromagnetism',
          ],
        },
        {
          main: 'Light and Optics',
          subtopics: [
            'Reflection and Mirrors',
            'Refraction and Lenses',
            'Optical Instruments',
            'Wave Optics',
          ],
        },
      ],
      5: [
        {
          main: 'Mechanics',
          subtopics: [
            'Scalars and Vectors',
            'Motion in One Dimension',
            "Newton's Laws of Motion",
            "Applications of Newton's Laws",
            'Circular Motion and Gravitation',
          ],
        },
        {
          main: 'Energy and Momentum',
          subtopics: [
            'Work and Energy',
            'Conservation of Energy',
            'Systems of Particles and Conservation of Momentum',
          ],
        },
        {
          main: 'Heat and Temperature',
          subtopics: [
            'Temperature and Heat',
            'Heat Transfer',
            'Thermal Properties of Matter',
          ],
        },
        {
          main: 'Electricity and Magnetism',
          subtopics: [
            'Electric Charge and Electric Field',
            'Electric Current',
            'Circuits',
            'Magnetism and Electromagnetism',
          ],
        },
        {
          main: 'Light and Optics',
          subtopics: [
            'Reflection and Mirrors',
            'Refraction and Lenses',
            'Optical Instruments',
            'Wave Optics',
          ],
        },
        {
          main: 'Sound Waves',
          subtopics: [
            'Characteristics of Sound Waves',
            'Properties of Sound',
            'Sound Wave Behavior',
          ],
        },
      ],
      6: [
        {
          main: 'Mechanical Energy',
          subtopics: [
            'Types of Energy',
            'Kinetic Energy',
            'Potential Energy',
            'Conservation of Mechanical Energy',
          ],
        },
        {
          main: 'Forces and Motion',
          subtopics: [
            'Types of Forces',
            'Friction',
            'Motion Graphs',
            'Newton’s Laws of Motion',
          ],
        },
        {
          main: 'Thermal Energy',
          subtopics: [
            'Heat Transfer',
            'Thermal Conductivity',
            'Thermal Expansion',
            'Heat Engines',
          ],
        },
        {
          main: 'Waves and Sound',
          subtopics: [
            'Types of Waves',
            'Wave Properties',
            'Sound Waves',
            'Applications of Sound Waves',
          ],
        },
        {
          main: 'Light and Optics',
          subtopics: [
            'Reflection and Refraction',
            'Lenses',
            'Color and Filters',
            'Optical Devices',
          ],
        },
      ],
      7: [
        {
          main: 'Forces and Motion',
          subtopics: [
            'Types of Forces',
            'Friction',
            'Motion Graphs',
            'Newton’s Laws of Motion',
          ],
        },
        {
          main: 'Thermal Energy',
          subtopics: [
            'Heat Transfer',
            'Thermal Conductivity',
            'Thermal Expansion',
            'Heat Engines',
          ],
        },
        {
          main: 'Waves and Sound',
          subtopics: [
            'Types of Waves',
            'Wave Properties',
            'Sound Waves',
            'Applications of Sound Waves',
          ],
        },
        {
          main: 'Electricity and Magnetism',
          subtopics: [
            'Electric Charge',
            'Electric Current',
            'Magnetic Fields',
            'Electromagnetic Induction',
          ],
        },
        {
          main: 'Light and Optics',
          subtopics: [
            'Reflection and Refraction',
            'Lenses',
            'Color and Filters',
            'Optical Devices',
          ],
        },
      ],
      8: [
        {
          main: 'Mechanical Waves',
          subtopics: [
            'Types of Mechanical Waves',
            'Wave Properties',
            'Wave Interactions',
            'Standing Waves',
          ],
        },
        {
          main: 'Forces and Motion',
          subtopics: [
            'Momentum',
            'Circular Motion',
            'Gravity',
            'Universal Gravitation',
          ],
        },
        {
          main: 'Electricity and Magnetism',
          subtopics: [
            'Electric Fields',
            'Electric Potential',
            'Electric Circuits',
            'Magnetic Fields',
          ],
        },
        {
          main: 'Light and Optics',
          subtopics: [
            'The Nature of Light',
            'Reflection and Mirrors',
            'Refraction and Lenses',
            'Optical Instruments',
          ],
        },
        {
          main: 'Thermal Physics',
          subtopics: [
            'Thermal Energy Transfer',
            'Thermal Properties of Matter',
            'Heat Engines',
            'Thermodynamics',
          ],
        },
      ],
      9: [
        {
          main: 'Motion in One Dimension',
          subtopics: [
            'Speed and Velocity',
            'Acceleration',
            'Graphing Motion',
            'Equations of Motion',
          ],
        },
        {
          main: 'Forces and Newton’s Laws',
          subtopics: [
            'Force and Motion',
            'Newton’s First Law',
            'Newton’s Second Law',
            'Newton’s Third Law',
          ],
        },
        {
          main: 'Energy and Work',
          subtopics: [
            'Work and Energy',
            'Conservation of Energy',
            'Power',
            'Work-Energy Theorem',
          ],
        },
        {
          main: 'Momentum and Collisions',
          subtopics: [
            'Impulse and Momentum',
            'Conservation of Momentum',
            'Elastic and Inelastic Collisions',
            'Center of Mass',
          ],
        },
        {
          main: 'Circular and Satellite Motion',
          subtopics: [
            'Uniform Circular Motion',
            'Centripetal Force',
            'Gravitational Forces',
            'Satellite Motion',
          ],
        },
      ],
      10: [
        {
          main: 'Kinematics and Dynamics',
          subtopics: [
            'Motion in One Dimension',
            'Projectile Motion',
            'Newton’s Laws of Motion',
            'Circular Motion',
          ],
        },
        {
          main: 'Forces and Fields',
          subtopics: [
            'Electric Forces and Fields',
            'Magnetic Forces and Fields',
            'Gravitational Forces and Fields',
            'Field Theory',
          ],
        },
        {
          main: 'Energy and Power',
          subtopics: [
            'Work and Energy',
            'Conservation of Energy',
            'Power',
            'Energy Transfer',
          ],
        },
        {
          main: 'Electricity and Magnetism',
          subtopics: [
            'Electric Circuits',
            'Magnetic Fields and Forces',
            'Electromagnetic Induction',
            'Alternating Current',
          ],
        },
        {
          main: 'Waves and Optics',
          subtopics: [
            'Wave Properties',
            'Sound Waves',
            'Light Waves',
            'Geometric Optics',
          ],
        },
      ],
      11: [
        {
          main: 'Classical Mechanics',
          subtopics: [
            'Kinematics',
            'Dynamics',
            'Energy Conservation',
            'Circular Motion',
            'Gravitation',
          ],
        },
        {
          main: 'Electromagnetism',
          subtopics: [
            'Electrostatics',
            'Electric Current',
            'Magnetic Fields',
            'Electromagnetic Induction',
          ],
        },
        {
          main: 'Thermodynamics',
          subtopics: [
            'Thermal Equilibrium',
            'Laws of Thermodynamics',
            'Heat Engines',
            'Entropy',
          ],
        },
        {
          main: 'Waves and Optics',
          subtopics: [
            'Wave Motion',
            'Wave Properties',
            'Geometrical Optics',
            'Physical Optics',
          ],
        },
        {
          main: 'Modern Physics',
          subtopics: ['Quantum Mechanics', 'Particle Physics', 'Relativity'],
        },
      ],
      12: [
        {
          main: 'Quantum Mechanics',
          subtopics: [
            'Wave-Particle Duality',
            'Quantum Superposition',
            'Quantum Entanglement',
            'Quantum Tunneling',
          ],
        },
        {
          main: 'Relativity',
          subtopics: [
            'Special Relativity',
            'General Relativity',
            'Space-Time',
            'Black Holes',
          ],
        },
        {
          main: 'Nuclear Physics',
          subtopics: [
            'Nuclear Reactions',
            'Nuclear Fission',
            'Nuclear Fusion',
            'Radioactivity',
          ],
        },
        {
          main: 'Astrophysics',
          subtopics: [
            'Stellar Evolution',
            'Galactic Dynamics',
            'Cosmology',
            'Dark Matter and Dark Energy',
          ],
        },
        {
          main: 'Advanced Topics',
          subtopics: [
            'String Theory',
            'Quantum Field Theory',
            'Particle Physics',
            'High-Energy Physics',
          ],
        },
      ],
      13: [
        {
          main: 'Advanced Mechanics',
          subtopics: [
            'Lagrangian Mechanics',
            'Hamiltonian Mechanics',
            'Celestial Mechanics',
          ],
        },
        {
          main: 'Quantum Mechanics',
          subtopics: [
            'Wave-Particle Duality',
            'Quantum Entanglement',
            'Quantum Tunneling',
          ],
        },
        {
          main: 'Relativity',
          subtopics: [
            'Special Relativity',
            'General Relativity',
            'Black Holes',
          ],
        },
        {
          main: 'Particle Physics',
          subtopics: [
            'Standard Model',
            'Elementary Particles',
            'Particle Accelerators',
          ],
        },
      ],
    };

    for (const grade of grades) {
      const gradeLevel = grade.name;
      const lessonName = `Physics Curriculum Grade ${gradeLevel}`;
      const lesson = new Lesson({
        name: lessonName,
        order: parseInt(gradeLevel, 10),
        grade: grade._id,
        classType: physicsClassType._id,
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

        // Creating a main section content for video
        const mainSectionVideoContent = new SectionContent({
          title: `Overview of ${topic.main}`,
          description: `Detailed video overview of ${topic.main}`,
          url: 'https://res.cloudinary.com/jamilyaedume/video/upload/v1713617808/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/ln7v2bzfhcoymixjoqtp.mp4',
          type: 'video',
          order: 1,
          lessonSection: section._id,
        });

        await mainSectionVideoContent.save();

        // Creating a main section content for PDF
        const mainSectionPDFContent = new SectionContent({
          title: `PDF Summary of ${topic.main}`,
          description: `Detailed PDF summary of ${topic.main}`,
          url: 'https://res.cloudinary.com/jamilyaedume/image/upload/v1713617900/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/wryzckvownev9norbsjz.pdf',
          type: 'pdf',
          order: 2,
          lessonSection: section._id,
        });

        await mainSectionPDFContent.save();

        section.sectionContents = [
          mainSectionVideoContent._id,
          mainSectionPDFContent._id,
        ];
        await section.save();

        let subsectionOrder = 1;
        for (const subtopic of topic.subtopics) {
          const subsection = new LessonSection({
            name: subtopic,
            order: subsectionOrder++,
            parentSection: section._id,
            lesson: lesson._id,
          });

          await subsection.save();

          // Video content for subsection
          const subsectionVideoContent = new SectionContent({
            title: `Learn about ${subtopic}`,
            description: `${subtopic} explained in detail.`,
            url: 'https://res.cloudinary.com/jamilyaedume/video/upload/v1713617808/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/ln7v2bzfhcoymixjoqtp.mp4',
            type: 'video',
            order: 1,
            lessonSection: subsection._id,
          });

          await subsectionVideoContent.save();

          // PDF content for subsection
          const subsectionPDFContent = new SectionContent({
            title: `PDF details on ${subtopic}`,
            description: `${subtopic} in PDF format.`,
            url: 'https://res.cloudinary.com/jamilyaedume/image/upload/v1713617900/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/wryzckvownev9norbsjz.pdf',
            type: 'pdf',
            order: 2,
            lessonSection: subsection._id,
          });

          await subsectionPDFContent.save();

          subsection.sectionContents = [
            subsectionVideoContent._id,
            subsectionPDFContent._id,
          ];
          await subsection.save();

          section.subSections = (section.subSections || []).concat(
            subsection._id,
          );
        }

        await section.save();
        lesson.lessonSections = (lesson.lessonSections || []).concat(
          section._id,
        );
      }

      await lesson.save();
      console.log(
        `Detailed Physics lesson for Grade ${gradeLevel} created successfully.`,
      );
    }

    console.log(
      'All detailed Physics lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed Physics lessons:', error);
  }
}

async function createChemistryLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Chemistry lessons for teacher:', teacher);
  try {
    const chemistryClassType = await ClassType.findOne({ name: 'Chemistry' });
    const grades = teacher.teacherClassTypeGrades
      .map((gct) => gct.grade)
      .reduce((acc, grade) => {
        if (!acc.find((g) => g._id.toString() === grade._id.toString())) {
          acc.push(grade);
        }
        return acc;
      }, []);

    const topics = {
      5: [
        {
          main: 'States of Matter',
          subtopics: ['Gases', 'Liquids', 'Solids', 'Phase Changes'],
        },
        {
          main: 'Chemical Reactions',
          subtopics: [
            'Types of Reactions',
            'Balancing Equations',
            'Reaction Stoichiometry',
          ],
        },
        {
          main: 'Solutions and Solubility',
          subtopics: [
            'Solution Formation',
            'Concentration Units',
            'Factors Affecting Solubility',
          ],
        },
      ],
      6: [
        {
          main: 'Introduction to Chemistry',
          subtopics: [
            'Basic Concepts',
            'Properties of Matter',
            'Physical and Chemical Changes',
          ],
        },
        {
          main: 'Atoms and Elements',
          subtopics: [
            'Atomic Structure',
            'Elements and Compounds',
            'Periodic Table Basics',
          ],
        },
        {
          main: 'Chemical Bonding',
          subtopics: ['Ionic Bonds', 'Covalent Bonds', 'Properties of Bonds'],
        },
      ],
      7: [
        {
          main: 'Chemical Reactions',
          subtopics: [
            'Types of Reactions',
            'Balancing Equations',
            'Reaction Rates',
          ],
        },
        {
          main: 'Acids and Bases',
          subtopics: [
            'Properties of Acids',
            'Properties of Bases',
            'Neutralization Reactions',
          ],
        },
        {
          main: 'Solutions and Solubility',
          subtopics: [
            'Solution Formation',
            'Factors Affecting Solubility',
            'Concentration Units',
          ],
        },
      ],
      8: [
        {
          main: 'Chemical Reactions',
          subtopics: [
            'Types of Reactions',
            'Balancing Equations',
            'Reaction Stoichiometry',
          ],
        },
        {
          main: 'Periodic Table',
          subtopics: [
            'Trends in the Periodic Table',
            'Groups and Periods',
            'Valence Electrons',
          ],
        },
        {
          main: 'Chemical Bonding',
          subtopics: ['Ionic Bonds', 'Covalent Bonds', 'Metallic Bonds'],
        },
      ],
      9: [
        {
          main: 'Atomic Structure',
          subtopics: [
            'Subatomic Particles',
            'Atomic Models',
            'Electron Configuration',
          ],
        },
        {
          main: 'Chemical Kinetics',
          subtopics: ['Reaction Rates', 'Rate Laws', 'Reaction Mechanisms'],
        },
        {
          main: 'Organic Chemistry',
          subtopics: ['Hydrocarbons', 'Functional Groups', 'Isomerism'],
        },
      ],
      10: [
        {
          main: 'Chemical Equilibrium',
          subtopics: [
            'Equilibrium Constant',
            "Le Chatelier's Principle",
            'Factors Affecting Equilibrium',
          ],
        },
        {
          main: 'Acids and Bases',
          subtopics: ['pH Scale', 'Buffer Solutions', 'Titration'],
        },
        {
          main: 'Redox Reactions',
          subtopics: [
            'Oxidation-Reduction',
            'Half-Reactions',
            'Electrochemical Cells',
          ],
        },
      ],
      11: [
        {
          main: 'Thermodynamics',
          subtopics: [
            'Heat Transfer',
            'Laws of Thermodynamics',
            'Thermal Equilibrium',
          ],
        },
        {
          main: 'Chemical Kinetics',
          subtopics: ['Reaction Rates', 'Rate Laws', 'Collision Theory'],
        },
        {
          main: 'Electrochemistry',
          subtopics: ['Redox Reactions', 'Galvanic Cells', 'Electrolysis'],
        },
      ],
      12: [
        {
          main: 'Organic Chemistry',
          subtopics: ['Organic Reactions', 'Functional Groups', 'Nomenclature'],
        },
        {
          main: 'Nuclear Chemistry',
          subtopics: [
            'Nuclear Reactions',
            'Radioactivity',
            'Nuclear Stability',
          ],
        },
        {
          main: 'Chemical Analysis',
          subtopics: [
            'Qualitative Analysis',
            'Quantitative Analysis',
            'Spectroscopy',
          ],
        },
      ],
      13: [
        {
          main: 'Advanced Topics in Chemistry',
          subtopics: [
            'Advanced Organic Chemistry',
            'Biochemistry',
            'Advanced Analytical Chemistry',
          ],
        },
        {
          main: 'Materials Science',
          subtopics: [
            'Polymer Chemistry',
            'Nanotechnology',
            'Materials Characterization',
          ],
        },
        {
          main: 'Environmental Chemistry',
          subtopics: [
            'Pollution Control',
            'Green Chemistry',
            'Environmental Analysis',
          ],
        },
      ],
    };

    for (const grade of grades) {
      const gradeLevel = grade.name;
      const lessonName = `Chemistry Curriculum Grade ${gradeLevel}`;
      const lesson = new Lesson({
        name: lessonName,
        order: parseInt(gradeLevel, 10),
        grade: grade._id,
        classType: chemistryClassType._id,
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

        // Creating main section content for video
        const mainSectionVideoContent = new SectionContent({
          title: `Overview of ${topic.main}`,
          description: `Detailed video overview of ${topic.main}`,
          url: 'https://res.cloudinary.com/jamilyaedume/video/upload/v1713688638/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/hvb8zm5pjmx2lwq4hqgi.mp4',
          type: 'video',
          order: 1,
          lessonSection: section._id,
        });

        await mainSectionVideoContent.save();

        // Creating main section content for PDF
        const mainSectionPDFContent = new SectionContent({
          title: `PDF Summary of ${topic.main}`,
          description: `Detailed PDF summary of ${topic.main}`,
          url: 'https://res.cloudinary.com/jamilyaedume/image/upload/v1713617900/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/wryzckvownev9norbsjz.pdf',
          type: 'pdf',
          order: 2,
          lessonSection: section._id,
        });

        await mainSectionPDFContent.save();

        section.sectionContents = [
          mainSectionVideoContent._id,
          mainSectionPDFContent._id,
        ];
        await section.save();

        let subsectionOrder = 1;
        for (const subtopic of topic.subtopics) {
          const subsection = new LessonSection({
            name: subtopic,
            order: subsectionOrder++,
            parentSection: section._id,
            lesson: lesson._id,
          });

          await subsection.save();

          // Video content for subsection
          const subsectionVideoContent = new SectionContent({
            title: `Learn about ${subtopic}`,
            description: `${subtopic} explained in detail.`,
            url: 'https://res.cloudinary.com/jamilyaedume/video/upload/v1713688638/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/hvb8zm5pjmx2lwq4hqgi.mp4',
            type: 'video',
            order: 1,
            lessonSection: subsection._id,
          });

          await subsectionVideoContent.save();

          // PDF content for subsection
          const subsectionPDFContent = new SectionContent({
            title: `PDF details on ${subtopic}`,
            description: `${subtopic} in PDF format.`,
            url: 'https://res.cloudinary.com/jamilyaedume/image/upload/v1713617900/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/wryzckvownev9norbsjz.pdf',
            type: 'pdf',
            order: 2,
            lessonSection: subsection._id,
          });

          await subsectionPDFContent.save();

          subsection.sectionContents = [
            subsectionVideoContent._id,
            subsectionPDFContent._id,
          ];
          await subsection.save();

          section.subSections = (section.subSections || []).concat(
            subsection._id,
          );
        }

        await section.save();
        lesson.lessonSections = (lesson.lessonSections || []).concat(
          section._id,
        );
      }

      await lesson.save();
      console.log(
        `Detailed Chemistry lesson for Grade ${gradeLevel} created successfully.`,
      );
    }

    console.log(
      'All detailed Chemistry lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed Chemistry lessons:', error);
  }
}
