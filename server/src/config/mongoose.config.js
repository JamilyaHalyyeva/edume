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

async function initializeGradeClassTypeMappings() {
  try {
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
    ]);

    const gradesData = Array.from({ length: 13 }, (_, i) => ({ name: i + 1 }));
    const grades = await Grade.insertMany(gradesData);

    const defaultMappings = [];

    //1st grade --> Math, German, French, Latin, English
    //2nd grade --> Math, German, French, Latin, English
    //3rd grade --> Math, German, French, Latin, English
    //4th grade --> Math, German, French, Latin, English
    //5th grade --> Math, German, Physics, Biology, Music, Geography, History, English
    //6th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History, English
    //7th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History, English
    //8th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History
    //9th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History
    //10th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History
    //11th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History
    //12th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History
    //13th grade --> Math, German, Physics, Chemistry, Biology, Music, Geography, History

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
        }); // French
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
  } catch (error) {
    console.error('Error initializing class types:', error);
  }
}
// Math teachers: John Doe, Max Mustermann, Maria Musterfrau
// Physics teachers: John Doe, Alex Schmidt, Anna Schneider
// Chemistry teachers: John Doe, Alex Schmidt, Anna Schneider
// Biology teachers: Jane Doe, David Fischer
// Music teachers: Jane Doe, David Fischer
// Geography teachers: Jane Doe, David Fischer
// History teachers: Michael Smith, David Fischer
// English teachers: Michael Smith, David Fischer
// German teachers: Michael Smith, David Fischer
// French teachers: Emily Brown, David Fischer
// Latin teachers: Emily Brown, David Fischer

// John Doe: Math, Physics, Chemistry
// Jane Doe: Biology, Music, Geography
// Michael Smith: History, English, German
// Emily Brown: French, Latin
// Max Mustermann: 1-4 grades and Math, German, French, Latin, English
// Maria Musterfrau: 1-4 grades and Math, German, French, Latin, English
// Alex Schmidt: 5-8 grades and Physics, Biology, Chemistry
// Anna Schneider: 5-8 grades and Physics, Biology, Chemistry
// Peter Müller: 5-8 grades and Geography, History, Latin
// Mary Schulz: 5-8 grades and Geography, History, Latin
// David Merkel: 5-8 grades and English, French, German
// David Fischer: 9-13 grades and Math, Physics, Chemistry, Biology, Music, Geography, History

async function initializeTeachers() {
  try {
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
            (gct) =>
              gct.classType.name === 'Physics' &&
              ['5', '6', '7', '8', '9', '10', '11', '12', '13'].includes(
                gct.grade.name,
              ),
          ),
          ...savedGradeClassTypes.filter(
            (gct) =>
              gct.classType.name === 'Chemistry' &&
              ['6', '7', '8', '9', '10', '11', '12', '13'].includes(
                gct.grade.name,
              ),
          ),
        ],
      },
      {
        username: 'Jane',
        surname: 'Doe',
        email: 'janedoe@gmail.com',
        password: await bcrypt.hash(password, 12),
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
  } catch (error) {
    console.error('Error initializing teachers:', error);
  }
}

async function initializeLessonData() {
  try {
    // 1-13 grades and Math, Physics, Chemistry
    const teacherjohndoe = await User.findOne({ email: 'johndoe@gmail.com' })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');
    await createMathLessonsRegardingTeachersGrades(teacherjohndoe);
    await createPhysicsLessonsRegardingTeachersGrades(teacherjohndoe);
    await createChemistryLessonsRegardingTeachersGrades(teacherjohndoe);

    // 1-13 grades Biology, Music, Geography
    const teacherjanedoe = await User.findOne({ email: 'janedoe@gmail.com' })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');
    await createBiologyLessonsRegardingTeachersGrades(teacherjanedoe);
    await createMusicLessonsRegardingTeachersGrades(teacherjanedoe);
    await createGeographyLessonsRegardingTeachersGrades(teacherjanedoe);

    //michaelsmith@gmail.com
    //1-13 grade History, English, German
    const teachermichaelsmith = await User.findOne({
      email: 'michaelsmith@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');
    await createHistoryLessonsRegardingTeachersGrades(teachermichaelsmith);
    await createEnglishLessonsRegardingTeachersGrades(teachermichaelsmith);
    await createGermanLessonsRegardingTeachersGrades(teachermichaelsmith);

    //emilybrown@gmail.com
    //1-4 grades and French, Latin
    const teacheremilybrown = await User.findOne({
      email: 'emilybrown@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createFrenchLessonsRegardingTeachersGrades(teacheremilybrown);
    await createLatinLessonsRegardingTeachersGrades(teacheremilybrown);

    //maxmustermann@gmail.com
    //  1-4 grades and Math, German, French, Latin, English
    const teachermaxmustermann = await User.findOne({
      email: 'maxmustermann@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createMathLessonsRegardingTeachersGrades(teachermaxmustermann);
    await createGermanLessonsRegardingTeachersGrades(teachermaxmustermann);
    await createFrenchLessonsRegardingTeachersGrades(teachermaxmustermann);
    await createLatinLessonsRegardingTeachersGrades(teachermaxmustermann);
    await createEnglishLessonsRegardingTeachersGrades(teachermaxmustermann);

    //mariamusterfrau@gmail.com
    // 1-4 grades and Math, German, French, Latin, English
    const teachermariamusterfrau = await User.findOne({
      email: 'mariamusterfrau@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createMathLessonsRegardingTeachersGrades(teachermariamusterfrau);
    await createGermanLessonsRegardingTeachersGrades(teachermariamusterfrau);
    await createFrenchLessonsRegardingTeachersGrades(teachermariamusterfrau);
    await createLatinLessonsRegardingTeachersGrades(teachermariamusterfrau);
    await createEnglishLessonsRegardingTeachersGrades(teachermariamusterfrau);

    //alexschmidt@gmail.com
    // 5-8 grades and Physics, Biology, Chemistry
    const teacheralexschmidt = await User.findOne({
      email: 'alexschmidt@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createPhysicsLessonsRegardingTeachersGrades(teacheralexschmidt);
    await createBiologyLessonsRegardingTeachersGrades(teacheralexschmidt);
    await createChemistryLessonsRegardingTeachersGrades(teacheralexschmidt);

    //annaschneider@gmail.com
    // 5-8 grades and Physics, Biology, Chemistry
    const teacherannaschneider = await User.findOne({
      email: 'annaschneider@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createPhysicsLessonsRegardingTeachersGrades(teacherannaschneider);
    await createBiologyLessonsRegardingTeachersGrades(teacherannaschneider);
    await createChemistryLessonsRegardingTeachersGrades(teacherannaschneider);

    //petermuller@gmail.com
    // 5-8 grades and Geography, History, Latin
    const teacherpetermuller = await User.findOne({
      email: 'petermuller@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createGeographyLessonsRegardingTeachersGrades(teacherpetermuller);
    await createHistoryLessonsRegardingTeachersGrades(teacherpetermuller);
    await createLatinLessonsRegardingTeachersGrades(teacherpetermuller);

    //maryschulz@gmail.com
    // 5-8 grades and Geography, History, Latin
    const teachermaryschulz = await User.findOne({
      email: 'maryschulz@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createGeographyLessonsRegardingTeachersGrades(teachermaryschulz);
    await createHistoryLessonsRegardingTeachersGrades(teachermaryschulz);
    await createLatinLessonsRegardingTeachersGrades(teachermaryschulz);

    //davidmerkel@gmail.com
    // 5-8 grades and English, French, German
    const teacherdavidmerkel = await User.findOne({
      email: 'davidmerkel@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createEnglishLessonsRegardingTeachersGrades(teacherdavidmerkel);
    await createFrenchLessonsRegardingTeachersGrades(teacherdavidmerkel);
    await createGermanLessonsRegardingTeachersGrades(teacherdavidmerkel);

    //davidfischer@gmail.com
    // 9-13 grades and Math, Physics, Chemistry, Biology, Music, Geography, History
    const teacherdavidfischer = await User.findOne({
      email: 'davidfischer@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createMathLessonsRegardingTeachersGrades(teacherdavidfischer);
    await createPhysicsLessonsRegardingTeachersGrades(teacherdavidfischer);
    await createChemistryLessonsRegardingTeachersGrades(teacherdavidfischer);
    await createBiologyLessonsRegardingTeachersGrades(teacherdavidfischer);
    await createMusicLessonsRegardingTeachersGrades(teacherdavidfischer);
    await createGeographyLessonsRegardingTeachersGrades(teacherdavidfischer);
    await createHistoryLessonsRegardingTeachersGrades(teacherdavidfischer);

    //sophieweber@gmail.com
    // 9-13 grades and Math, Physics, Chemistry, Biology, Music, Geography, History
    const teachersophieweber = await User.findOne({
      email: 'sophieweber@gmail.com',
    })
      .populate('teacherClassTypeGrades.grade')
      .populate('teacherClassTypeGrades.classType');

    await createMathLessonsRegardingTeachersGrades(teachersophieweber);
    await createPhysicsLessonsRegardingTeachersGrades(teachersophieweber);
    await createChemistryLessonsRegardingTeachersGrades(teachersophieweber);
    await createBiologyLessonsRegardingTeachersGrades(teachersophieweber);
    await createMusicLessonsRegardingTeachersGrades(teachersophieweber);
    await createGeographyLessonsRegardingTeachersGrades(teachersophieweber);
    await createHistoryLessonsRegardingTeachersGrades(teachersophieweber);
  } catch (error) {
    console.error('Error initializing lessons:', error);
  }
}

async function initializeData() {
  try {
    await initializeGradeClassTypeMappings();
    await initializeTeachers();
    await initializeLessonData();

    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

async function processLessonData(teacher, lessonData) {
  try {
    let classType = await ClassType.findOne({ name: lessonData.classType });
    let grades = teacher.teacherClassTypeGrades
      .filter((gct) => gct.classType.name === lessonData.classType)
      .map((gct) => gct.grade)
      .reduce((acc, grade) => {
        if (!acc.find((g) => g._id.toString() === grade._id.toString())) {
          acc.push(grade);
        }
        return acc;
      }, []);

    console.log('grades:', grades);
    for (const grade of grades) {
      const gradeLevel = grade.name;
      const lessonName = `${lessonData.classType} Curriculum Grade ${gradeLevel}`;
      const lesson = new Lesson({
        name: lessonName,
        order: parseInt(gradeLevel, 10),
        grade: grade._id,
        classType: classType._id,
        user: teacher._id,
      });

      await lesson.save();

      let order = 1;
      for (const topic of lessonData.topics[gradeLevel]) {
        const section = new LessonSection({
          name: topic.main,
          order: order++,
          lesson: lesson._id,
        });

        // Creating a main section content for video
        const mainSectionVideoContent = new SectionContent({
          title: `Overview of ${topic.main}`,
          description: `Detailed video overview of ${topic.main}`,
          url: lessonData.exampleVideoUrl,
          type: 'video',
          order: 1,
          lessonSection: section._id,
        });

        await mainSectionVideoContent.save();

        // Creating a main section content for PDF
        const mainSectionPDFContent = new SectionContent({
          title: `PDF Summary of ${topic.main}`,
          description: `Detailed PDF summary of ${topic.main}`,
          url: lessonData.examplePdfUrl,
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
            url: lessonData.exampleVideoUrl,
            type: 'video',
            order: 1,
            lessonSection: subsection._id,
          });

          await subsectionVideoContent.save();

          // PDF content for subsection
          const subsectionPDFContent = new SectionContent({
            title: `PDF details on ${subtopic}`,
            description: `${subtopic} in PDF format.`,
            url: lessonData.examplePdfUrl,
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
        `Detailed ${lessonData.classType} lesson for Grade ${gradeLevel} created successfully.`,
      );
    }
  } catch (error) {
    console.error('Error in creating detailed lessons:', error);
  }
}

async function createMathLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Math lessons for teacher:', teacher.email);
  try {
    const mathTopics = {
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
    const lessonData = {
      classType: 'Math',
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713280780/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/1713280777106-math%20%281%29%20%281%29.mp4.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
      topics: mathTopics,
    };

    await processLessonData(teacher, lessonData);

    console.log('All detailed Math lessons have been created across grades.');
  } catch (error) {
    console.error('Error in creating detailed Math lessons:', error);
  }
}

async function createPhysicsLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Physics lessons for teacher:', teacher.email);
  try {
    const physicsTopics = {
      5: [
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
      ],
      6: [
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
      ],
      7: [
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
        {
          main: 'Forces and Motion',
          subtopics: [
            'Types of Forces',
            'Friction',
            'Motion Graphs',
            'Newton’s Laws of Motion',
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
          main: 'Electricity and Magnetism',
          subtopics: [
            'Electric Fields',
            'Electric Potential',
            'Electric Circuits',
            'Magnetic Fields',
          ],
        },
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
      ],
      10: [
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
          main: 'Advanced Quantum Mechanics',
          subtopics: [
            'Quantum Field Theory',
            'Particle Physics',
            'Quantum Computing',
          ],
        },
        {
          main: 'Advanced Relativity',
          subtopics: [
            'Black Hole Thermodynamics',
            'Gravitational Waves',
            'Cosmological Models',
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
    const lessonData = {
      classType: 'Physics',
      topics: physicsTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713617808/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/ln7v2bzfhcoymixjoqtp.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log(
      'All detailed Physics lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed Physics lessons:', error);
  }
}

async function createChemistryLessonsRegardingTeachersGrades(teacher) {
  console.log(
    'Creating detailed Chemistry lessons for teacher:',
    teacher.email,
  );
  try {
    const chemistryTopics = {
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
    const lessonData = {
      classType: 'Chemistry',
      topics: chemistryTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713688638/jamilyaedume/661d98654f3f58c49cb43476/661d986d4f3f58c49cb4370f/hvb8zm5pjmx2lwq4hqgi.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);
    console.log(
      'All detailed Chemistry lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed Chemistry lessons:', error);
  }
}

async function createBiologyLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Biology lessons for teacher:', teacher.email);
  try {
    const biologyTopics = {
      5: [
        {
          main: 'Cells and Living Things',
          subtopics: [
            'Cell Structure',
            'Cell Functions',
            'Characteristics of Living Things',
          ],
        },
        {
          main: 'Human Body Systems',
          subtopics: [
            'Digestive System',
            'Respiratory System',
            'Circulatory System',
          ],
        },
        {
          main: 'Plants',
          subtopics: [
            'Plant Structure',
            'Photosynthesis',
            'Plant Reproduction',
          ],
        },
      ],
      6: [
        {
          main: 'Ecosystems',
          subtopics: ['Biomes', 'Food Webs', 'Energy Flow'],
        },
        {
          main: 'Energy in Life Systems',
          subtopics: [
            'Photosynthesis',
            'Cellular Respiration',
            'Energy Transfer',
          ],
        },
        {
          main: 'Animal Behavior',
          subtopics: ['Instincts', 'Learning', 'Communication'],
        },
      ],
      7: [
        {
          main: 'Genetics',
          subtopics: ['Heredity', 'Genetic Variation', 'Mendelian Genetics'],
        },
        {
          main: 'Evolution',
          subtopics: ['Natural Selection', 'Adaptation', 'Speciation'],
        },
        {
          main: 'Ecology',
          subtopics: [
            'Population Ecology',
            'Community Ecology',
            'Ecosystem Dynamics',
          ],
        },
      ],
      8: [
        {
          main: 'Microbiology',
          subtopics: ['Viruses', 'Bacteria', 'Protists'],
        },
        {
          main: 'Cell Biology',
          subtopics: ['Cell Organelles', 'Cellular Processes', 'Cell Division'],
        },
        {
          main: 'Human Biology',
          subtopics: [
            'Human Anatomy',
            'Human Physiology',
            'Human Reproduction',
          ],
        },
      ],
      9: [
        {
          main: 'Cellular Processes',
          subtopics: [
            'DNA Replication',
            'Transcription and Translation',
            'Cell Signaling',
          ],
        },
        {
          main: 'Genetics and Heredity',
          subtopics: [
            'Gene Expression',
            'Genetic Disorders',
            'Inheritance Patterns',
          ],
        },
        {
          main: 'Biotechnology',
          subtopics: ['Genetic Engineering', 'Cloning', 'Gene Therapy'],
        },
      ],
      10: [
        {
          main: 'Human Anatomy and Physiology',
          subtopics: ['Organ Systems', 'Homeostasis', 'Endocrine System'],
        },
        {
          main: 'Diseases and Disorders',
          subtopics: [
            'Infectious Diseases',
            'Non-infectious Diseases',
            'Immune Response',
          ],
        },
        {
          main: 'Ecology',
          subtopics: ['Biomes', 'Biodiversity', 'Conservation Biology'],
        },
      ],
      11: [
        {
          main: 'Ecology and Conservation',
          subtopics: [
            'Ecosystem Ecology',
            'Population Dynamics',
            'Conservation Biology',
          ],
        },
        {
          main: 'Environmental Biology',
          subtopics: ['Environmental Issues', 'Pollution', 'Climate Change'],
        },
        {
          main: 'Symbiotic Relationships',
          subtopics: ['Mutualism', 'Commensalism', 'Parasitism'],
        },
      ],
      12: [
        {
          main: 'Advanced Genetics',
          subtopics: ['Genetic Variation', 'Gene Regulation', 'Epigenetics'],
        },
        {
          main: 'Molecular Biology',
          subtopics: ['DNA Structure', 'Gene Expression', 'Protein Synthesis'],
        },
        {
          main: 'Evolutionary Biology',
          subtopics: ['Speciation', 'Population Genetics', 'Phylogenetics'],
        },
      ],
      13: [
        {
          main: 'Neuroscience',
          subtopics: [
            'Neuron Structure',
            'Neurotransmission',
            'Brain Function',
          ],
        },
        {
          main: 'Biochemistry',
          subtopics: ['Macromolecules', 'Enzymes', 'Metabolic Pathways'],
        },
        {
          main: 'Advanced Topics in Evolution and Ecology',
          subtopics: [
            'Ecological Succession',
            'Adaptive Radiation',
            'Macroevolution',
          ],
        },
      ],
    };
    const lessonData = {
      classType: 'Biology',
      topics: biologyTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713899464/biology_i1kefy.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log(
      'All detailed Biology lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed Biology lessons:', error);
  }
}

async function createMusicLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Music lessons for teacher:', teacher.email);
  try {
    const musicTopics = {
      5: [
        {
          main: 'Introduction to Music',
          subtopics: [
            'Musical Instruments',
            'Basic Music Theory',
            'Types of Music',
          ],
        },
        {
          main: 'Rhythm and Meter',
          subtopics: ['Beat and Tempo', 'Time Signatures', 'Rhythmic Patterns'],
        },
        {
          main: 'Musical Notation',
          subtopics: ['Notes and Rests', 'Scales', 'Key Signatures'],
        },
      ],
      6: [
        {
          main: 'Music Composition',
          subtopics: ['Melody', 'Harmony', 'Rhythm', 'Form'],
        },
        {
          main: 'Music History',
          subtopics: [
            'Medieval Music',
            'Renaissance Music',
            'Baroque Music',
            'Classical Music',
          ],
        },
        {
          main: 'Music Performance',
          subtopics: [
            'Instrumental Techniques',
            'Vocal Techniques',
            'Ensemble Playing',
          ],
        },
      ],
      7: [
        {
          main: 'Advanced Music Theory',
          subtopics: ['Chords', 'Cadences', 'Modulation', 'Counterpoint'],
        },
        {
          main: 'World Music',
          subtopics: [
            'Music from Different Cultures',
            'Traditional Instruments',
            'Ethnomusicology',
          ],
        },
        {
          main: 'Music Technology',
          subtopics: [
            'Digital Audio Workstations',
            'MIDI',
            'Recording Techniques',
          ],
        },
      ],
      8: [
        {
          main: 'Music Theory Fundamentals',
          subtopics: [
            'Interval Identification',
            'Triads and Seventh Chords',
            'Chord Progressions',
          ],
        },
        {
          main: 'Music Analysis',
          subtopics: [
            'Formal Analysis',
            'Harmonic Analysis',
            'Rhythmic Analysis',
          ],
        },
        {
          main: 'Music Performance Techniques',
          subtopics: ['Expressive Techniques', 'Articulation', 'Dynamics'],
        },
      ],
      9: [
        {
          main: 'Advanced Music Composition',
          subtopics: ['Counterpoint', 'Orchestration', 'Extended Techniques'],
        },
        {
          main: 'Music in Context',
          subtopics: [
            'Music and Society',
            'Music and Culture',
            'Music and Politics',
          ],
        },
        {
          main: 'Music Production',
          subtopics: [
            'Studio Recording',
            'Mixing and Mastering',
            'Sound Design',
          ],
        },
      ],
      10: [
        {
          main: 'Music History: 20th Century',
          subtopics: [
            'Impressionism',
            'Expressionism',
            'Serialism',
            'Minimalism',
          ],
        },
        {
          main: 'Music Theory: Advanced Topics',
          subtopics: ['Modal Interchange', 'Chromatic Harmony', 'Polytonality'],
        },
        {
          main: 'Performance Skills Development',
          subtopics: [
            'Solo Performance',
            'Ensemble Performance',
            'Improvisation',
          ],
        },
      ],
      11: [
        {
          main: 'Jazz Studies',
          subtopics: [
            'History of Jazz',
            'Jazz Theory',
            'Improvisation in Jazz',
          ],
        },
        {
          main: 'Contemporary Music',
          subtopics: ['Rock Music', 'Pop Music', 'Electronic Music'],
        },
        {
          main: 'Music and Technology Integration',
          subtopics: [
            'Interactive Music Systems',
            'Computer-Assisted Composition',
            'Live Electronics',
          ],
        },
      ],
      12: [
        {
          main: 'Music Criticism and Analysis',
          subtopics: [
            'Critical Listening',
            'Analytical Techniques',
            'Evaluation of Performances',
          ],
        },
        {
          main: 'Capstone Project',
          subtopics: [
            'Research Paper',
            'Composition Portfolio',
            'Performance Showcase',
          ],
        },
        {
          main: 'Music Business and Entrepreneurship',
          subtopics: [
            'Copyright and Licensing',
            'Marketing Strategies',
            'Managing a Music Career',
          ],
        },
      ],
      13: [
        {
          main: 'Music Research and Scholarship',
          subtopics: ['Musicology', 'Ethnomusicology', 'Music Theory Pedagogy'],
        },
        {
          main: 'Advanced Performance Studies',
          subtopics: [
            'Concerto Performance',
            'Recital Preparation',
            'Chamber Music',
          ],
        },
        {
          main: 'Professional Development in Music',
          subtopics: [
            'Audition Techniques',
            'Career Planning',
            'Networking in the Music Industry',
          ],
        },
      ],
    };
    const lessonData = {
      classType: 'Music',
      topics: musicTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713900523/music_awfazv.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log('All detailed Music lessons have been created across grades.');
  } catch (error) {
    console.error('Error in creating detailed Music lessons:', error);
  }
}

async function createGeographyLessonsRegardingTeachersGrades(teacher) {
  console.log(
    'Creating detailed Geography lessons for teacher:',
    teacher.email,
  );
  try {
    const geographyTopics = {
      5: [
        {
          main: 'Introduction to Geography',
          subtopics: [
            'Basic Geography Terms',
            'Map Reading Skills',
            'Continents and Oceans',
          ],
        },
        {
          main: 'Physical Geography',
          subtopics: ['Landforms', 'Climate Zones', 'Biomes'],
        },
        {
          main: 'Human Geography',
          subtopics: [
            'Population Distribution',
            'Cultural Landscapes',
            'Urbanization',
          ],
        },
      ],
      6: [
        {
          main: 'Geographic Tools and Techniques',
          subtopics: ['Maps and Globes', 'GIS and GPS', 'Remote Sensing'],
        },
        {
          main: "Earth's Structure and Processes",
          subtopics: [
            'Plate Tectonics',
            'Volcanoes and Earthquakes',
            'Weathering and Erosion',
          ],
        },
        {
          main: 'Cultural Geography',
          subtopics: [
            'Language Distribution',
            'Religious Landscapes',
            'Economic Activities',
          ],
        },
      ],
      7: [
        {
          main: 'Regions of the World',
          subtopics: [
            'North America',
            'South America',
            'Europe',
            'Asia',
            'Africa',
            'Australia',
          ],
        },
        {
          main: 'Environmental Issues',
          subtopics: ['Deforestation', 'Water Scarcity', 'Climate Change'],
        },
        {
          main: 'Political Geography',
          subtopics: [
            'Borders and Boundaries',
            'Territorial Disputes',
            'Geopolitical Organizations',
          ],
        },
      ],
      8: [
        {
          main: 'Physical Geography',
          subtopics: ['Geomorphology', 'Climatology', 'Hydrology'],
        },
        {
          main: 'Human Geography',
          subtopics: [
            'Population Geography',
            'Economic Geography',
            'Cultural Geography',
          ],
        },
        {
          main: 'Geopolitics',
          subtopics: [
            'International Relations',
            'Geopolitical Theories',
            'Globalization',
          ],
        },
      ],
      9: [
        {
          main: 'Geographic Information Systems (GIS)',
          subtopics: [
            'GIS Applications',
            'Data Analysis',
            'Spatial Visualization',
          ],
        },
        {
          main: 'Environmental Geography',
          subtopics: [
            'Natural Resource Management',
            'Sustainability',
            'Environmental Impact Assessment',
          ],
        },
        {
          main: 'Urban Geography',
          subtopics: [
            'Urbanization Trends',
            'City Planning',
            'Urban Development',
          ],
        },
      ],
      10: [
        {
          main: 'Regional Geography',
          subtopics: [
            'Regional Analysis',
            'Regional Development',
            'Regional Planning',
          ],
        },
        {
          main: 'Global Issues',
          subtopics: [
            'Globalization',
            'Sustainable Development',
            'International Conflicts',
          ],
        },
        {
          main: 'Geography of Tourism',
          subtopics: ['Tourism Industry', 'Tourist Behavior', 'Ecotourism'],
        },
      ],
      11: [
        {
          main: 'Geographic Techniques',
          subtopics: [
            'Fieldwork Methods',
            'Surveying Techniques',
            'Remote Sensing Applications',
          ],
        },
        {
          main: 'Geography of Culture',
          subtopics: [
            'Cultural Landscape Analysis',
            'Cultural Geography Theories',
            'Ethnography',
          ],
        },
        {
          main: 'Geography of Trade and Commerce',
          subtopics: [
            'Trade Routes',
            'Economic Integration',
            'Global Supply Chains',
          ],
        },
      ],
      12: [
        {
          main: 'Geopolitical Analysis',
          subtopics: [
            'Political Geography Theories',
            'Geopolitical Conflict Analysis',
            'Strategic Planning',
          ],
        },
        {
          main: 'Environmental Policy and Management',
          subtopics: [
            'Policy Analysis',
            'Environmental Legislation',
            'Resource Management Strategies',
          ],
        },
        {
          main: 'Applied Geography',
          subtopics: [
            'Geographical Information Systems',
            'Remote Sensing Applications',
            'Urban Planning',
          ],
        },
      ],
      13: [
        {
          main: 'Advanced Geographic Studies',
          subtopics: [
            'Geographic Research Methods',
            'Spatial Analysis Techniques',
            'Geographic Modeling',
          ],
        },
        {
          main: 'Special Topics in Geography',
          subtopics: [
            'Human-Environment Interactions',
            'Geopolitical Dynamics',
            'Global Urbanization Trends',
          ],
        },
        {
          main: 'Geography Capstone Project',
          subtopics: [
            'Research Design',
            'Data Collection',
            'Project Presentation',
          ],
        },
      ],
    };

    const lessonData = {
      classType: 'Geography',
      topics: geographyTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713902537/geography_qarr9c.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);
    console.log(
      'All detailed Geography lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed Geography lessons:', error);
  }
}

async function createHistoryLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed History lessons for teacher:', teacher.email);
  try {
    // Define history topics by grade
    const historyTopics = {
      5: [
        {
          main: 'Ancient Civilizations',
          subtopics: [
            'Mesopotamia',
            'Ancient Egypt',
            'Indus Valley Civilization',
          ],
        },
        {
          main: 'World Religions',
          subtopics: ['Judaism', 'Christianity', 'Islam'],
        },
      ],
      6: [
        {
          main: 'Classical Period',
          subtopics: [
            'Ancient Greece',
            'Ancient Rome',
            'Greek and Roman Mythology',
          ],
        },
        {
          main: 'Medieval Times',
          subtopics: ['Feudalism', 'Knights and Chivalry', 'Crusades'],
        },
      ],
      7: [
        {
          main: 'Renaissance and Reformation',
          subtopics: [
            'Renaissance Art',
            'Martin Luther and the Reformation',
            'Scientific Revolution',
          ],
        },
        {
          main: 'Exploration and Colonization',
          subtopics: [
            'Age of Exploration',
            'Colonial America',
            'European Empires',
          ],
        },
      ],
      8: [
        {
          main: 'Revolutionary Period',
          subtopics: [
            'American Revolution',
            'French Revolution',
            'Industrial Revolution',
          ],
        },
        {
          main: 'Nationalism and Imperialism',
          subtopics: [
            'Unification of Italy and Germany',
            'Scramble for Africa',
            'Opium Wars',
          ],
        },
      ],
      9: [
        {
          main: 'World Wars',
          subtopics: [
            'Causes of World War I',
            'World War II Timeline',
            'Aftermath and Effects',
          ],
        },
        {
          main: 'Cold War Era',
          subtopics: [
            'Origins of the Cold War',
            'Cuban Missile Crisis',
            'End of the Cold War',
          ],
        },
      ],
      10: [
        {
          main: 'Modern History',
          subtopics: [
            'Globalization',
            'Human Rights Movements',
            'Technological Revolution',
          ],
        },
        {
          main: 'Contemporary Issues',
          subtopics: ['Climate Change', 'Terrorism', 'Global Conflicts'],
        },
      ],
      11: [
        {
          main: 'Political Systems',
          subtopics: ['Democracy', 'Dictatorship', 'Communism'],
        },
        {
          main: 'Economic History',
          subtopics: ['Capitalism', 'Socialism', 'Global Trade'],
        },
      ],
      12: [
        {
          main: 'Cultural Movements',
          subtopics: ['Feminism', 'Civil Rights Movement', 'Environmentalism'],
        },
        {
          main: 'Modern Diplomacy',
          subtopics: [
            'United Nations',
            'International Relations',
            'Peacekeeping Missions',
          ],
        },
      ],
      13: [
        {
          main: 'Historical Analysis',
          subtopics: [
            'Primary vs. Secondary Sources',
            'Historiography',
            'Interpreting Historical Data',
          ],
        },
        {
          main: 'Research Project',
          subtopics: [
            'Select a Historical Topic',
            'Gather and Analyze Sources',
            'Present Findings',
          ],
        },
      ],
    };
    const lessonData = {
      classType: 'History',
      topics: historyTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713902665/history_kwul24.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log(
      'All detailed History lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed History lessons:', error);
  }
}

async function createLatinLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed Latin lessons for teacher:', teacher.email);

  try {
    const latinTopics = {
      1: [
        {
          main: 'Latin Alphabet',
          subtopics: ['Letters', 'Pronunciation'],
        },
        {
          main: 'Basic Vocabulary',
          subtopics: ['Greetings', 'Numbers', 'Colors'],
        },
      ],
      2: [
        {
          main: 'Grammar',
          subtopics: ['Nouns', 'Verbs', 'Adjectives'],
        },
        {
          main: 'Simple Sentences',
          subtopics: ['Subject-Verb Agreement', 'Sentence Structure'],
        },
      ],
      3: [
        {
          main: 'Verb Conjugation',
          subtopics: ['Present Tense', 'Past Tense', 'Future Tense'],
        },
        {
          main: 'Latin Literature',
          subtopics: ['Introduction to Latin Literature', 'Famous Works'],
        },
      ],
      4: [
        {
          main: 'Advanced Grammar',
          subtopics: ['Cases', 'Moods', 'Tenses'],
        },
        {
          main: 'Latin Poetry',
          subtopics: ['Meter', 'Rhythm', 'Poetic Devices'],
        },
      ],
      5: [
        {
          main: 'Latin Prose',
          subtopics: ['Prose Composition', 'Historical Texts'],
        },
        {
          main: 'Roman History',
          subtopics: ['Ancient Rome', 'Key Events', 'Notable Figures'],
        },
      ],
    };

    const lessonData = {
      classType: 'Latin',
      topics: latinTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713904736/latinclass_tn5lx3.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log('All detailed Latin lessons have been created across grades.');
  } catch (error) {
    console.error('Error in creating detailed Latin lessons:', error);
  }
}

async function createEnglishLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed English lessons for teacher:', teacher.email);
  try {
    const englishTopics = {
      1: [
        {
          main: 'Alphabet and Phonics',
          subtopics: [
            'Letter Recognition',
            'Letter Sounds',
            'Basic Phonics Rules',
          ],
        },
        {
          main: 'Basic Vocabulary',
          subtopics: ['Common Words', 'Family Members', 'Colors', 'Animals'],
        },
      ],
      2: [
        {
          main: 'Grammar Fundamentals',
          subtopics: ['Nouns', 'Verbs', 'Adjectives', 'Sentence Structure'],
        },
        {
          main: 'Reading Comprehension',
          subtopics: ['Understanding Stories', 'Answering Questions'],
        },
      ],
      3: [
        {
          main: 'Parts of Speech',
          subtopics: ['Pronouns', 'Adverbs', 'Prepositions', 'Conjunctions'],
        },
        {
          main: 'Writing Skills',
          subtopics: [
            'Sentence Formation',
            'Paragraph Writing',
            'Creative Writing',
          ],
        },
      ],
      4: [
        {
          main: 'Grammar Review',
          subtopics: ['Subject-Verb Agreement', 'Tenses', 'Plurals'],
        },
        {
          main: 'Literature Appreciation',
          subtopics: ['Exploring Stories', 'Identifying Themes'],
        },
      ],
      5: [
        {
          main: 'Advanced Vocabulary',
          subtopics: ['Synonyms', 'Antonyms', 'Word Definitions'],
        },
        {
          main: 'Writing Composition',
          subtopics: ['Essay Writing', 'Story Writing', 'Poetry'],
        },
      ],
      6: [
        {
          main: 'Critical Reading Skills',
          subtopics: ['Analyzing Texts', 'Inferencing', 'Drawing Conclusions'],
        },
        {
          main: 'Research and Presentation',
          subtopics: ['Gathering Information', 'Creating Presentations'],
        },
      ],
      7: [
        {
          main: 'Advanced Grammar',
          subtopics: [
            'Complex Sentences',
            'Subject-Verb Agreement',
            'Punctuation',
          ],
        },
        {
          main: 'Literary Analysis',
          subtopics: ['Theme Analysis', 'Character Development'],
        },
      ],
    };

    const lessonData = {
      classType: 'English',
      topics: englishTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713904924/english_tuuwnp.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log(
      'All detailed English lessons have been created across grades.',
    );
  } catch (error) {
    console.error('Error in creating detailed English lessons:', error);
  }
}

async function createFrenchLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed French lessons for teacher:', teacher.email);
  try {
    const frenchTopics = {
      1: [
        {
          main: 'Basic French Phrases',
          subtopics: ['Greetings', 'Introductions', 'Common Expressions'],
        },
        {
          main: 'Numbers and Counting',
          subtopics: ['Counting 1-20', 'Basic Math Operations'],
        },
      ],
      2: [
        {
          main: 'Everyday Vocabulary',
          subtopics: ['Colors', 'Family Members', 'Food and Drinks'],
        },
        {
          main: 'Simple Conversations',
          subtopics: ['Asking Questions', 'Describing Things'],
        },
      ],
      3: [
        {
          main: 'Introduction to Grammar',
          subtopics: ['Nouns', 'Verbs', 'Articles'],
        },
        {
          main: 'Exploring the French Culture',
          subtopics: ['Traditions', 'Holidays', 'Cuisine'],
        },
      ],
      4: [
        {
          main: 'Expanding Vocabulary',
          subtopics: ['Animals', 'Weather', 'Places'],
        },
        {
          main: 'Sentence Formation',
          subtopics: ['Constructing Basic Sentences', 'Asking for Directions'],
        },
      ],
      5: [
        {
          main: 'Intermediate Grammar',
          subtopics: ['Adjectives', 'Pronouns', 'Conjugation of Regular Verbs'],
        },
        {
          main: 'French Literature',
          subtopics: ['Short Stories', 'Poetry', 'Fables'],
        },
      ],
    };

    const lessonData = {
      classType: 'French',
      topics: frenchTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713905272/french_po5yqm.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log('All detailed French lessons have been created across grades.');
  } catch (error) {
    console.error('Error in creating detailed French lessons:', error);
  }
}

async function createGermanLessonsRegardingTeachersGrades(teacher) {
  console.log('Creating detailed German lessons for teacher:', teacher.email);
  try {
    const germanTopics = {
      1: [
        {
          main: 'Introduction to German',
          subtopics: ['Greetings', 'Basic Vocabulary', 'Numbers 1-10'],
        },
        {
          main: 'Colors and Shapes',
          subtopics: ['Identifying Colors', 'Basic Shapes'],
        },
      ],
      2: [
        {
          main: 'Everyday Objects',
          subtopics: ['Household Items', 'School Supplies', 'Toys'],
        },
        {
          main: 'Family and Friends',
          subtopics: ['Family Members', 'Describing People'],
        },
      ],
      3: [
        {
          main: 'Weather and Seasons',
          subtopics: ['Weather Conditions', 'Seasonal Vocabulary'],
        },
        {
          main: 'Daily Activities',
          subtopics: ['Routine Activities', 'Hobbies'],
        },
      ],
      4: [
        {
          main: 'Food and Drinks',
          subtopics: ['Food Items', 'Beverages', 'Eating Out'],
        },
        {
          main: 'Transportation',
          subtopics: ['Modes of Transport', 'Travel Vocabulary'],
        },
      ],
      5: [
        {
          main: 'Holidays and Celebrations',
          subtopics: ['Traditional Festivals', 'Customs and Traditions'],
        },
        {
          main: 'Sports and Leisure',
          subtopics: ['Popular Sports', 'Recreational Activities'],
        },
      ],
      6: [
        {
          main: 'German Literature',
          subtopics: ['Famous Authors', 'Classic German Books'],
        },
        {
          main: 'Music and Arts',
          subtopics: ['German Composers', 'Art Movements'],
        },
      ],
      7: [
        {
          main: 'History and Culture',
          subtopics: ['Key Events', 'Cultural Influences'],
        },
        {
          main: 'Technology and Innovation',
          subtopics: ['Modern Inventions', 'Digital Trends'],
        },
      ],
      8: [
        {
          main: 'Politics and Society',
          subtopics: ['Government Systems', 'Social Issues'],
        },
        {
          main: 'Science and Research',
          subtopics: ['Scientific Discoveries', 'Breakthroughs'],
        },
      ],
      9: [
        {
          main: 'Advanced Grammar',
          subtopics: ['Verb Conjugation', 'Sentence Structure'],
        },
        {
          main: 'Literary Analysis',
          subtopics: ['Interpreting Texts', 'Analytical Writing'],
        },
      ],
      10: [
        {
          main: 'Debates and Discussions',
          subtopics: ['Contemporary Issues', 'Critical Thinking'],
        },
        {
          main: 'Cultural Studies',
          subtopics: ['Global Perspectives', 'Intercultural Communication'],
        },
      ],
      11: [
        {
          main: 'Philosophy and Ethics',
          subtopics: ['Ethical Theories', 'Moral Dilemmas'],
        },
        {
          main: 'Advanced Literature',
          subtopics: ['Modern German Authors', 'Literary Criticism'],
        },
      ],
      12: [
        {
          main: 'German Linguistics',
          subtopics: ['Language Variation', 'Dialects'],
        },
        {
          main: 'Media Studies',
          subtopics: ['Mass Media Analysis', 'Media Literacy'],
        },
      ],
      13: [
        {
          main: 'Thesis Preparation',
          subtopics: ['Research Methods', 'Academic Writing'],
        },
        {
          main: 'Independent Studies',
          subtopics: ['Specialized Topics', 'Research Projects'],
        },
      ],
    };

    const lessonData = {
      classType: 'German',
      topics: germanTopics,
      exampleVideoUrl:
        'https://res.cloudinary.com/jamilyaedume/video/upload/v1713905544/german_ysxj3v.mp4',
      examplePdfUrl:
        'https://file-examples.com/storage/fee868065066261f19c04c3/2017/10/file-sample_150kB.pdf',
    };

    await processLessonData(teacher, lessonData);

    console.log('All detailed German lessons have been created across grades.');
  } catch (error) {
    console.error('Error in creating detailed German lessons:', error);
  }
}
