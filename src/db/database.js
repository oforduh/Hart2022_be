import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // .connect(URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })
    .then(() => console.log("Database Connection Successfull"));
};

export { dbConnection };
