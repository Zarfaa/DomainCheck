import Express from "express";
import domainRoutes from "./src/routes/domainRoutes.js";

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json()); 
app.use("/", domainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

