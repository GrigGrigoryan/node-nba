import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { asyncHandler } from '../utils';
import { StatusCode } from '../common/enums';
import axios, { AxiosRequestConfig } from 'axios';

export const listGames = asyncHandler(async (req: Req, res: Res, next: Next) => {
    let { page, per_page, seasons, date, team_ids }: any = req.query;
    let result: any;
    let params: any = {};

    if (page) params.page = page;
    if (per_page) params.per_page = per_page;

    if (typeof team_ids === 'string' && team_ids?.includes(',')) {
        team_ids = team_ids.split(',');
    }
    params['seasons'] = seasons;

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/games',
        params: {
            page,
            per_page,
            'seasons[]': seasons,
            date,
            'team_ids[]': team_ids
        },
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

export const getSpecificGame = asyncHandler(async (req: Req, res: Res, next: Next) => {
    const gameId: string | number = req.params.gameId;
    let result: any;

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: `https://free-nba.p.rapidapi.com/games/${gameId}`,
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

    if (!result) {
        return res.status(StatusCode.OK).send({});
    }

    return res.status(StatusCode.OK).send(result);
});
