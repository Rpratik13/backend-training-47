import express from "express";

const router = express();

router.get("/", (req, res) => {
  res.json({
    message: "Hello projects",
  });
});

export default router;
