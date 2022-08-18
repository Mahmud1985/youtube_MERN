import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {

    const newVideo = new Video({ userId: req.user.id, ...req.body })
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error)
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found."))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "you can only update your video."))
        }
    } catch (error) {
        next(error)
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found."))
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("video has been deleted.")
        } else {
            return next(createError(403, "you can only delete your video."))
        }
    } catch (error) {
        next(error)
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const addView = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { view: 1 }
        })
        res.status(200).json("the view has been increased.")
    } catch (error) {
        next(error)
    }
}

export const random = async (req, res, next) => {
    try {
        // aggregate function get random data with size 5 
        const videos = await Video.aggregate([{ $sample: { size: 5 } }])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const trend = async (req, res, next) => {
    try {
        // sort function from mongoose view:-1 for most viewed view:1 for less viewed.
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;
        // use Promise for get all videos from the subscribedChannels belong to the user.
        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const tags = async (req, res, next) => {
    try {
        // at first we split key words after tags?= java,c,html in to ['java' , 'c' ,'html'] then use $in method check that keys words inside database.
        const tags = req.query.tags.split(",")
        const videos = await Video.find({ tags: { $in: tags } }).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const search = async (req, res, next) => {
    try {
        //at first get query from request then put it into $regex function and search by title field from database.
        const query = req.query.q
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}