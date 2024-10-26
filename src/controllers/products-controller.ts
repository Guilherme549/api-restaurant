import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

class ProductController {
    async index(request: Request, response: Response, next: NextFunction){
        try {
            throw new AppError("Erro de teste")
            return response.json({ message: "ok" })
            // o error é captaduro pela va
        } catch (error) {
            next(error)
        }
    }
}

export { ProductController }