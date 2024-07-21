// Necesarios para el servidor backend
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuracion de la base de datos
const db = require('./config/db');

// Paginas de logeo y reestablecimiento de contraseña
const loginRoutes = require('./routes/login');
const searchRoutes = require('./routes/search');

// Paginas de mentores
const getProfileMentor = require('./routes/getProfileMentor');
const getReportsMentor = require('./routes/getReportsMentor');
const getSpecialtiesMentor = require('./routes/getSpecialties');
const changePassMentor = require('./routes/changePassMentor');
const showSesionesMentor = require('./routes/showSesionesMentor');
const updateProfileMentor = require('./routes/updateProfileMentor.js');

// Paginas de estudiantes
const getEventsFull = require('./routes/getEventsFull');
const getEventsStudent = require('./routes/getEventsStudent');
const getProfileStudent = require('./routes/getProfileStudent');
const getReportsStudent = require('./routes/getReportsStudent');
const changePassStudent = require('./routes/changePassStudent.js');
const showSesionesStudent = require('./routes/showSesionesStudent');
const getSpecialtyStudent = require('./routes/getSpecialtyStudent.js');

// Paginas de administradores
const getEventAdmin = require('./routes/getEventAdmin.js');
const newEventAdmin = require('./routes/newEventAdmin.js');
const updateEventAdmin = require('./routes/updateEventAdmin.js');
const getSpecialtiesAdmin = require('./routes/getSpecialtiesAdmin.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', loginRoutes);
app.use('/api', searchRoutes);

// Mentor
app.use('/api', getProfileMentor);
app.use('/api', getReportsMentor);
app.use('/api', changePassMentor);
app.use('/api', showSesionesMentor);
app.use('/api', updateProfileMentor);
app.use('/api', updateProfileMentor);
app.use('/api', getSpecialtiesMentor);

// Estudiante
app.use('/api', getEventsFull);
app.use('/api', getEventsStudent);
app.use('/api', getProfileStudent);
app.use('/api', getReportsStudent);
app.use('/api', changePassStudent);
app.use('/api', showSesionesStudent);
app.use('/api', getSpecialtyStudent);

// Administrador
app.use('/api', getEventAdmin);
app.use('/api', newEventAdmin);
app.use('/api', updateEventAdmin);
app.use('/api', getSpecialtiesAdmin);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});