import { Router } from "express";

import { TableSessionsController } from "@/controllers/tables-sessions-controller";

const tableSessionsRoutes = Router()
const tableSessionsController = new TableSessionsController()

tableSessionsRoutes.get("/", tableSessionsController.index)
tableSessionsRoutes.post("/", tableSessionsController.create)
tableSessionsRoutes.patch("/:id", tableSessionsController.update)



export { tableSessionsRoutes }
