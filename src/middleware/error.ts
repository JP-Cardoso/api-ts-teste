import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-erros";


export const errorMiddleware = (
    (   //O Partial dis ao ts que o statusCode de error, pode vim ou não.
        error: Error & Partial<ApiError>,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.log(error);
        
        const statusCode = error.statusCode ?? Number(500);
        const message = error.statusCode ? error.message : 'Internal, server Error';
        return res.status(statusCode).json({ message});
    })