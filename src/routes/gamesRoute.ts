import {Router} from "express";
import { getSpecificGame, listGames } from "../controller";

const gamesRoute: Router = Router();

gamesRoute.route('/').get(listGames);
gamesRoute.route('/:gameId').get(getSpecificGame);

export default gamesRoute;