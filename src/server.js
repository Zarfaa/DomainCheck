import Express from "express";
import DomainRoutes from "./routes/DomainRouter.js";

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json()); 
app.use("/", DomainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

