const express = require("express");
const {
  uploadDocument,
  getDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const protect = require("../middleware/auth");
const upload = require("../config/multer");

const router = express.Router();

//all routes are protect

router.use(protect);
upload.single("file");
router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getDocuments);
router.get("/:id", getDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
