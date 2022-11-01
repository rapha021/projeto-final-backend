import express from "express"
import errorMiddleware from "./Middlewares/error/error.middleware"
import appRoutes from "./Routes"
import { hospitalRoutes } from "./Routes/hospital.routes"

const app = express()
app.use(express.json())

app.use(errorMiddleware)
app.use('/hospital', hospitalRoutes);

appRoutes(app)

export default app
