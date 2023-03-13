const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3000
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// Tasks
const tasks = require('./routes/tasks')

const connectDB = require('./db/connection')

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());


app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// app.get('/api/v1/tasks')  - get all the tasks
// app.post('/api/v1/tasks')  - create a new task
// app.get('/api/v1/tasks/:id')  - get single task
// app.patch('/api/v1/tasks/:id')  - update the single task
// app.delete('/api/v1/task/:id') - delete task


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`port is running in ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();















