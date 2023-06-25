const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

require('dotenv').config();

const booksRouter = require('./routes/booksroute');
const authRouter = require('./routes/userRouter');

app.use(morgan('dev'));
app.use(cors());
//body parser for post requests
app.use(express.json({ limit: '30mb', extended: true }));
//body parser for  html post form
app.use(express.urlencoded({ limit: '30mb', extended: true }));
//error handline middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went Wrong';
  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});

//routes
app.use('/booksapi/v1', booksRouter);
app.use('/booksapi/v1/auth/', authRouter);
//disables strict mode to allow you to query MongoDB with any fields, even if they are not defined in the schema.

mongoose.set('strictQuery', false);
//connecting to my database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('server is listening on port 5000'.cyan.bold.underline);
    });

    //User.insertMany(dataUser).then(console.log('done'));
    //Product.insertMany(dataProduct).then(console.log('done'));
    //ProductStat.insertMany(dataProductStat).then(console.log('done'));
    // Transactions.insertMany(dataTransaction).then(console.log('done'));
    //OverallStat.insertMany(dataOverallStat).then(console.log('done'));
  })
  .catch((error) => console.log(`${error} did not Connect`));
