import roles from './role.routes';
import users from './user.routes';
import posts from './post.routes';
import commentary from './commentary.routes';
import access from './access.routes';

import { Application } from 'express';

const routers = (app: Application): void => {
  const prefix = '/api';
  app.use(`${prefix}/roles`, roles);
  app.use(`${prefix}/users`, users);
  app.use(`${prefix}/posts`, posts);
  app.use(`${prefix}/comments`, commentary);
  app.use(`${prefix}/access`, access);
};

export default routers;
