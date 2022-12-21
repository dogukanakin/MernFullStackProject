const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


/**
 * access to .env file 
 */
 require('dotenv/config')


 const bookRouter = require('./routers/books');

 /**
  * middleware
  */
 app.use(express.json())
 app.use(cors());
 app.options('*', cors())




/**
 * database connection to mongodb
 */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/api/books', bookRouter);


const PORT =  3000



 app.listen(PORT,() => {
    console.log('Server started on port 3000');
  })
  