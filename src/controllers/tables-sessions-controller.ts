import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class TableSessionsController {
    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            })

            const { table_id } = bodySchema.parse(request.body)

            const session = await knex<TableSessionsRepository>("tables_sessions").where({
                table_id
            }).orderBy("opened_at", "desc").first()
            
            // se a mesa nao esta aberta
            if (session && !session.closed_at){
                throw new AppError("This table is already open")
            }

            await knex<TableSessionsRepository>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now(),
            })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }
    
}

export { TableSessionsController }