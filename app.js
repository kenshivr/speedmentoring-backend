import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import db from './config/db';

import loginRoutes from './routes/login';
import searchRoutes from './routes/search';

import updateProfileRoutes from './routes/updateMentor';
import getSpecialties from './routes/getSpecialties';
import changePass from './routes/changePasswordMentor';
import showSesionesMentorRoutes from './routes/showSesionesMentor';
import getReportsMentorRoutes from './routes/getReportsMentor';

import getProfileStudent from './routes/getProfileStudent';
import showSesionesStudentRoutes from './routes/showSesionesStudent';
import getReportsStudentRoutes from './routes/getReportsStudent';

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