var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Multer setup
const upload = multer({ dest: "uploads/" });

// File upload route
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) return res.json({ error: "No file uploaded" });

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("✅ App listening on port " + port);
});
