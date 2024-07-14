const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/db');

const loginRoutes = require('./routes/login');
const searchRoutes = require('./routes/search');

const updateProfileRoutes = require('./routes/updateMentor');
const getSpecialties = require('./routes/getSpecialties');
const changePass = require('./routes/changePasswordMentor');
const showSesionesMentorRoutes = require('./routes/showSesionesMentor');
const getReportsMentorRoutes = require('./routes/getReportsMentor');

const getProfileStudent = require('./routes/getProfileStudent');
const showSesionesStudentRoutes = require('./routes/showSesionesStudent');
const getReportsStudentRoutes = require('./routes/getReportsStudent');
const getEventsStudent = require('./routes/getEventsStudent');
const getEventsFull = require('./routes/getEventsFull');
const changePasswordStudent = require('./routes/changePasswordStudent');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

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
app.use('/api', getEventsStudent);
app.use('/api', changePasswordStudent);
app.use('/api', getEventsFull);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});