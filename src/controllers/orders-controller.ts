import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodyschema = z.object({
                table_session_id: z.number(),
                products_id: z.number(),
                quantity: z.number()
            })

            const { table_session_id, products_id, quantity } = bodyschema.parse(request.body)

        const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ id: table_session_id})
        .first()
        
        if(!session){
            throw new AppError("session table not found")
        }

        // se tem uma data de fechamento
        if(session.closed_at){
            throw new AppError("This table is closed")
        }
        
        const product = await knex<ProductRepository>("products")
        .where({ id: products_id})
        .first()
        
        // Se o produto nao existir
        if(!product){
            throw new AppError("Product not found")
        }

        await knex<OrdersRepository>("orders").insert({
            table_session_id,
            products_id,
            quantity,
            price: product.price
        })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction){
        try {
            const { table_session_id } = request.params

            // Pedido
            const order = await knex("orders")
            .select("orders.id", "orders.table_session_id", "orders.products_id", "products.name", "orders.price", "orders.quantity", 
            knex.raw("(orders.price * orders.quantity) AS total"),
            "orders.created_at",
            "orders.updated_at"
         )
            .join("products", "products.id", "orders.products_id")
            .where({ table_session_id })
            .orderBy("orders.created_at", "desc")





            return response.json(order)
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction){
        try {
            const { table_session_id } = request.params

            const order = await knex("orders")
            .select(
                knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) as total"),
                knex.raw("COALESCE(SUM(orders.quantity), 0) as quantity")
            )
            .where({ table_session_id })
            .first()
            

            return response.json(order)
        } catch (error) {
            next(error)
        }
    }
}


export { OrdersController}