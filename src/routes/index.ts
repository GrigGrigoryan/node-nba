import { Router } from 'express';
import gamesRoute from './gamesRoute';
import statsRoute from './statsRoute';
import teamsRoute from './teamsRoute';

const apiRouter: Router = Router();

apiRouter.use('/games', gamesRoute);
apiRouter.use('/stats', statsRoute);
apiRouter.use('/teams', teamsRoute);

export default apiRouter;
