import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { asyncHandler } from '../utils';
import { StatusCode } from '../common/enums';
import { Forbidden, InternalServerError } from '../core/errors';
import axios, { AxiosRequestConfig } from "axios";

export const listStats = asyncHandler(async (req: Req, res: Res, next: Next) => {
    let { page, per_page, seasons, dates, player_ids, game_ids }: any = req.query;
    let params: any = {}
    let result: any;

    if (page) params.page = page;
    if (dates) params.dates = dates;
    if (per_page) params.per_page = per_page;

    if (typeof seasons === 'string' && seasons?.includes(',')) {
        seasons = seasons.split(',');
    }
    params['seasons'] = seasons;

    if (player_ids && !Array.isArray(player_ids)) {
        player_ids = player_ids.split(',');
    }
    params['player_ids'] = player_ids;

    if (game_ids && !Array.isArray(game_ids)) {
        game_ids = game_ids.split(',');
    }
    params['game_ids'] = game_ids;

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/stats',
        params,
        headers: {
            'x-rapidapi-host': process.env.RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.RAPIDAPI_KEY
        }
    };

    try {
        const response = await axios.request(options);
        result = response?.data;
    } catch (err) {
        console.error(err);
    }

    if (!result?.data || !result?.data?.length) {
        return res.status(StatusCode.OK).send([]);
    }

    return res.status(StatusCode.OK).send(result);
});
