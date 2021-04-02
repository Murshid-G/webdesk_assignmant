const express =require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')

dotenv.config();
// connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true  },()=>{
    console.log('connect to db')
})
// middle
app.use(express.json())

// route midd
app.use('/api/user',authRoutes)
app.use('/api/posts', postsRoutes)
app.listen(3000,()=>{
    console.log('Server up and run')
})