import express from "express"
import { addVideo, addView, random, deleteVideo, getVideo, trend, updateVideo, sub, search, tags } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js"
const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)

//update a video
router.put("/:id", verifyToken, updateVideo)

//delete a video
router.delete("/:id", verifyToken, deleteVideo)

//get a video by id
router.get("/find/:id", getVideo)

//when view a video
router.put("/view/:id", addView)

//get trend a video
router.get("/trend", trend)

//get ramdom a video
router.get("/random", random)

//get subscribed videos
router.get("/sub", verifyToken, sub)

//get videos by tags
router.get("/tags", tags)

//get videos by title
router.get("/search", search)

export default router;