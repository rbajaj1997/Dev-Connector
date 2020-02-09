const express = require('express');
const connectDB = require('./config/db');
const usersRouter = require('./routers/api/users');
const authRouter = require('./routers/api/auth');
const profileRouter = require('./routers/api/profile');
const postsRouter = require('./routers/api/posts');
const path = require('path');

// initialize Express
const app = express();

// Connect to DB
connectDB();


// // Basic request
// app.get('/', (req, res) => {
//     res.send('API Running')
// })

// Make express able to send jsona and read json // Init Middleware
app.use(express.json({ extended: false }));

// Define Routers

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

// Serve statc assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('/client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Port Configurations
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening to port 3000!');
})