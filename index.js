import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import userRoutes from "./routes/users.js";
import stockRoutes from "./routes/stock.js";
import priceRoutes from "./routes/Price.js";
import productRoutes from "./routes/product.js";

/* OTHER PROJECT */
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";

import jwt from "jsonwebtoken";
import ApiKeys from "./models/ApiKeys.js";
import {deleteImages, getImages, postImage} from "./controllers/images.js";
import fs from 'fs';
import stock from "./models/Stock.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({
    // verify: (req, res, buf) => {
    //     req.rawBody = buf.toString()
    // },
    limit: '50mb'
}));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id } = req.params
        const path = `public/assets/${id}`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* Default */
app.get("/api", async (req, res)=>{
    res.status(200).json({ message: `Server is running ${new Date()}` });
});

/* ROUTES WITH FILES */
app.post("/api/images/:id", verifyToken, upload.single("file"), postImage);
app.get("/api/images/:id/:type", verifyToken, upload.single("file"), getImages);
app.delete("/api/images/:id", verifyToken, deleteImages);

/* ROUTES */
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/price", priceRoutes);
app.use("/api/product", productRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

console.log(`DB_URL= ${process.env.DB_URL}`)

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT,  async () => {

            console.log(`Server port: ${PORT}`);

            const apiKeys = await ApiKeys.findOne({blocked: false});

            if (apiKeys) return;

            const token = jwt.sign({ id: 0, login: "Admin", role: "admin" }, process.env.JWT_SECRET);

            const newApiKey = new ApiKeys(
                    {
                        Key: token,
                        blocked : false
                    }
                );
            await newApiKey.save();
            console.log(`Server API KEY: ${token}`);
        });
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });