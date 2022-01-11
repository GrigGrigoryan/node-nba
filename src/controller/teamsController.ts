import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { asyncHandler } from '../utils';
import { StatusCode } from '../common/enums';
import { Forbidden, InternalServerError } from '../core/errors';
import axios, { AxiosRequestConfig } from "axios";

export const listTeams = asyncHandler(async (req: Req, res: Res, next: Next) => {
    const { page } = req.query;
    let result: any;
    let params: any = {};
    if (page) params.page = page

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/teams',
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

export const getSpecificTeam = asyncHandler(async (req: Req, res: Res, next: Next) => {
    const teamId: string | number = req.params.teamId;
    let result: any;

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: `https://free-nba.p.rapidapi.com/teams/${teamId}`,
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