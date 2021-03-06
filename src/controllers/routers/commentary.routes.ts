import { Router, Request, Response, NextFunction } from 'express';
import { success } from '../middlewares/responseHandler';
import { validatorHandler } from '../middlewares/validatorHandler';
import { checkAuth } from '../middlewares/authHandler';
import {
  createCommentarySchema,
  commentaryUserIdSchema,
  commentaryPostIdSchema,
  getByUserAndPostId,
} from '../schemas/commentary.schema';
import {
  createCommentary,
  getAllCommentariesByPost,
  getAllCommentariesByUser,
  getAllCommentariesByUserAndPost,
} from '../../services/commentary.service';

const route = Router();

route.post(
  '/',
  checkAuth,
  validatorHandler(createCommentarySchema, 'body'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await createCommentary(req.body);
      return success(req, res, result, 201);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/byUserId/:id',
  checkAuth,
  validatorHandler({ id: commentaryUserIdSchema }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getAllCommentariesByUser(req.params.id);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  '/byPostId/:id',
  checkAuth,
  validatorHandler({ id: commentaryPostIdSchema }, 'params'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const result = await getAllCommentariesByPost(req.params.id);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

route.post(
  '/byUserAndPost/',
  checkAuth,
  validatorHandler(getByUserAndPostId, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllCommentariesByUserAndPost(req.body);
      return success(req, res, result, 200);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
