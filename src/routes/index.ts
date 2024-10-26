import { Router } from "express";


import { productsRoutes } from "./products-routes";
import { tableRoutes } from "./tables-routes";
import { tableSessionsRoutes } from "./tables-sessions-routes";

const routes = Router()

routes.use("/tables-sessions", tableSessionsRoutes)
routes.use("/products", productsRoutes)
routes.use("/tables", tableRoutes)


export { routes }