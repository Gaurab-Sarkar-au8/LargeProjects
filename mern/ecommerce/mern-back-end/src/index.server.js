const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// routes
const authRoutes = require('./routes/auth');

//environment variable 
env.config();

//mongodb connection
// mongodb+srv://root:<password>@cluster0.szxzs.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.szxzs.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true
  }
).then(() =>{
  console.log('Database Connected');
});

app.use(bodyParser());
app.use('/api', authRoutes)

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'hello from server'
  });
});

app.post('/data', (req, res, next) => {
  res.status(200).json({
    message: req.body
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
