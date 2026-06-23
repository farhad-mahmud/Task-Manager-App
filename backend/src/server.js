const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tasksRouter = require('./routes/task');

const app = express();

app.use(cors());
app.use(express.json());

 // console.log(..)

app.use('/api/task', tasksRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});