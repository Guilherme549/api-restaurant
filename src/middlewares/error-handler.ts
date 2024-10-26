import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

export function errorHandling(error: any, request: Request, response: Response, _:NextFunction){
    // Erro lançado por nos
    if(error instanceof AppError){
        return response.status(error.statusCode).json({ message: error.message })
    }

    // Erros genericos
    return response.status(500).json({ message: error.message})
}