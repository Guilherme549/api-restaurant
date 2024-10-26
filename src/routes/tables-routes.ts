import { Router } from "express";
import { TablesController } from "@/controllers/tables-controller";

const tableRoutes = Router()
const tableController = new TablesController()

tableRoutes.get("/", tableController.index)

export { tableRoutes }