import express from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import MongoDb from "./mongoDb";
import usersRouter from "./routes/users";
import imagesRouter from "./routes/images";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/users', usersRouter);
app.use('/images', imagesRouter);

const run = async () => {
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
    process.on("exit", () => {
        MongoDb.disconnect();
    });
};

run().catch((e) => console.error(e));
