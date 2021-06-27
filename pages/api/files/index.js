// GET
import formidable from "formidable";
const sharp = require("sharp");
const baseUrl = process.cwd();
sharp.cache(false);
export const config = {
  api: {
    bodyParser: false,
  },
};

async function resizeFile(path) {
  let buffer = await sharp(path)
    .resize(1000, 1000, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toBuffer();

  return sharp(buffer).toFile(path);
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const form = new formidable.IncomingForm();
        form.uploadDir = `public/images/`;
        form.keepExtensions = true;
        form.on("fileBegin", function (name, file) {
          //rename the incoming file to the file's name
          file.path = form.uploadDir + "/" + file.name;
        });
        form.parse(req, (err, fields, files) => {
          console.log(files);
          resizeFile(`public/images/${files.file.name}`);
        });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
