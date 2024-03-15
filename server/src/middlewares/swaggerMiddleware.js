import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Edume API with Swagger',
      version: '1.0.0',
      description: 'Documentation for Express API',
    },
  },
  apis: ['./src/routes/api/*.js'], // Path to the API routes folder
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUI };
