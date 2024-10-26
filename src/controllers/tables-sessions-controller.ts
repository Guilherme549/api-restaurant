import { Request, Response, NextFunction } from "express";
import { z } from "zod"

class TableSessionsController {
    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            })
            
            const { table_id } = bodySchema.parse(request.body)
            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }
    
}

export { TableSessionsController }