import express from "express"
import { routes } from "./routes/"
import { errorHandling } from "./middlewares/error-handler"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(routes)

// depois que todas as rotas foram tentadas a aplicacao ira acionar esta funcao
app.use(errorHandling)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))