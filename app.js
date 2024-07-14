import express from 'express';
// import { json } from 'body-parser';
import pkg from 'body-parser';
const { json } = pkg;
import cors from 'cors';

import loginRoutes from './routes/login.js';
import searchRoutes from './routes/search.js';

import updateProfileRoutes from './routes/updateMentor.js';
import getSpecialties from './routes/getSpecialties.js';
import changePass from './routes/changePasswordMentor.js';
import showSesionesMentorRoutes from './routes/showSesionesMentor.js';
import getReportsMentorRoutes from './routes/getReportsMentor.js';

import getProfileStudent from './routes/getProfileStudent.js';
import showSesionesStudentRoutes from './routes/showSesionesStudent.js';
import getReportsStudentRoutes from './routes/getReportsStudent.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

app.use('/api', loginRoutes);
app.use('/api', searchRoutes);

app.use('/api', updateProfileRoutes);
app.use('/api', getSpecialties);
app.use('/api', changePass);
app.use('/api', showSesionesMentorRoutes);
app.use('/api', getReportsMentorRoutes);

app.use('/api', getProfileStudent);
app.use('/api', showSesionesStudentRoutes);
app.use('/api', getReportsStudentRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});