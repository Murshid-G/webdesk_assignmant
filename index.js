const express =require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const empRoutes = require('./routes/employees')

dotenv.config();
// connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true  },()=>{
    console.log('connect to db')
})
// middle
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// route midd
app.use('/api/user',authRoutes)
app.use('/api/employee', empRoutes)
app.listen(3000,()=>{
    console.log('Server up and run')
})