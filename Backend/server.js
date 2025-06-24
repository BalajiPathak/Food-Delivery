const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
const db = require('./models');
require('./config/passport')(passport);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/authRoutes'));

// DB Sync
db.sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
