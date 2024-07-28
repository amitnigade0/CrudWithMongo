const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection')
const app = express();

const dotenv = require('dotenv').config();
const port = process.env.port || 3000;

connectDb();

app.use(express.json())
app.use('/api/cantacts', require('./routes/contactRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use(errorHandler)



app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})