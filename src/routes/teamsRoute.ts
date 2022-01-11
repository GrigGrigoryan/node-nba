import {Router} from "express";
import { getSpecificTeam, listTeams } from "../controller";

const teamsRoute: Router = Router();

teamsRoute.route('/').get(listTeams);
teamsRoute.route('/:teamId').get(getSpecificTeam);

export default teamsRoute;