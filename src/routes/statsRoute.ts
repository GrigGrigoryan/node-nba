import {Router} from "express";
import { listStats } from "../controller";

const statsRoute: Router = Router();

statsRoute.route('/').get(listStats);

export default statsRoute;