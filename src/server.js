import Express from "express";
import Dotenv from "dotenv";
import Cors from 'cors';
import * as Winston from '../src/middlewares/winstonLogger.js';
import DomainRoutes from "../src/routes/DomainRouter.js";

Dotenv.config();

const app = Express();

const PORT = process.env.PORT;

app.use(Express.json());

app.use(Cors());

// Use the logging middleware
app.use(Winston.logMiddleware);

app.use("/", DomainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
