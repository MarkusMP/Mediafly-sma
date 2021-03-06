import path from "path";
import express, { Request, Response } from "express";
import multer from "multer";
import { IGetFileInfoRequest } from "../utils/definitionFile";
import fs from "fs";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const path = `./uploads`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  "/",
  upload.single("image"),
  (req: IGetFileInfoRequest, res: Response) => {
    res.json({ image: `/${req.file.path}` });
  }
);

export default router;
