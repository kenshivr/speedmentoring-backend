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
const getMentors = require('./routes/getMentors.js');
const getProfileMentor = require('./routes/getProfileMentor');
const getReportsMentor = require('./routes/getReportsMentor');
const changePassMentor = require('./routes/changePassMentor');
const getSpecialtiesMentor = require('./routes/getSpecialties');
const showSesionesMentor = require('./routes/showSesionesMentor');
const updateProfileMentor = require('./routes/updateProfileMentor.js');

// Paginas de estudiantes
const getStudents = require('./routes/getStudents.js');
const getEventsFull = require('./routes/getEventsFull');
const saveFeedback = require('./routes/saveFeedback.js');
const getEventsStudent = require('./routes/getEventsStudent');
const getProfileStudent = require('./routes/getProfileStudent');
const getReportsStudent = require('./routes/getReportsStudent');
const changePassStudent = require('./routes/changePassStudent.js');
const showSesionesStudent = require('./routes/showSesionesStudent');
const getSpecialtyStudent = require('./routes/getSpecialtyStudent.js');

// Paginas de administradores
const newUsers = require('./routes/newUsers.js');
const getEventAdmin = require('./routes/getEventAdmin.js');
const newEventAdmin = require('./routes/newEventAdmin.js');
const importUsersAdmin = require('./routes/importUsers.js');
const updateEventAdmin = require('./routes/updateEventAdmin.js');
const getSpecialtiesAdmin = require('./routes/getSpecialtiesAdmin.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', loginRoutes); // Casi listo, solo falta admin
app.use('/api', searchRoutes); // Casi listo, solo falta admin

// Mentor
app.use('/api', getMentors);
app.use('/api', getProfileMentor);
app.use('/api', getReportsMentor);
app.use('/api', changePassMentor);
app.use('/api', showSesionesMentor);
app.use('/api', updateProfileMentor);
app.use('/api', updateProfileMentor);
app.use('/api', getSpecialtiesMentor);

// Estudiante
app.use('/api', getStudents);
app.use('/api', getEventsFull);
app.use('/api', getEventsStudent);
app.use('/api', getProfileStudent);
app.use('/api', getReportsStudent);
app.use('/api', changePassStudent);
app.use('/api', showSesionesStudent);
app.use('/api', getSpecialtyStudent);
app.use('/api', saveFeedback); // Tambien funciona para mentores

// Administrador
app.use('/api', newUsers);
app.use('/api', getEventAdmin);
app.use('/api', newEventAdmin);
app.use('/api', updateEventAdmin);
app.use('/api', importUsersAdmin);
app.use('/api', getSpecialtiesAdmin);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});