import { Router } from 'express';
import { createPost, getPosts, updatePost } from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.route('/create').post(createPost);
postRouter.route('/getPosts').get(getPosts);
postRouter.route('/update/:id').patch(updatePost);

export default postRouter;