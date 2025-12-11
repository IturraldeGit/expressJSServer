import express from 'express';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

const app = express();

app.use(express.json());

// router declaration
app.use('/api/v1/user', userRouter);
app.use('/api/v1/posts', postRouter);

//example route: http://localhost:4000/api/v1/user/register

export default app;