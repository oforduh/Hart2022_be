import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dbConnection } from "./src/db/database.js";
dbConnection();
import userPaymentRouter from "./src/api/userPayment/userPaymentRouter.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const port = process.env.PORT || 7000;

// routes
app.use("/api/auth", userPaymentRouter);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
