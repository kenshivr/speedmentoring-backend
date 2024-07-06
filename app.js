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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});