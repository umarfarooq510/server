const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// built-in middleware to parse JSON
app.use(express.json());
app.use(cors());

app.use('/api/products/', productRoutes); 
// console.log();

app.get('/', (req, res) => res.send('API is running...')); //test route

app.use(notFound);
app.use(errorHandler);

module.exports = app;