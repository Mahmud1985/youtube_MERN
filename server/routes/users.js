import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user 
router.put("/:id", verifyToken, update)

//detele user
router.delete("/:id", verifyToken, deleteUser)

//get a user 
router.get("/find/:id", getUser)

//subscribe or unsubscribe a user 
router.put("/sub/:id", verifyToken, subscribe)

//like a video
router.put("/like/:videoId", verifyToken, like)

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;