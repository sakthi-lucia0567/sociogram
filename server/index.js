import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

/* Configurations */

// use to grab file name from file-url esp for modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE CONFIGURATION

const storage = multer.diskStorage({
  /**
   * Sets the destination for storing uploaded files.
   *
   * @param {object} req - The request object.
   * @param {object} file - The file object.
   * @param {function} cb - The callback function.
   * @return {void}
   */
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  /**
   * Generates a function comment for the given function body.
   *
   * @param {Object} req - The request object.
   * @param {Object} file - The file object.
   * @param {function} cb - The callback function.
   * @return {undefined} - No return value.
   */
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// MONGOOSE SETUP //
const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`Error: ${error}`));
