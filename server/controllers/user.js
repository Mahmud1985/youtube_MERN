import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can updale only your account."))
    }
}
export const deleteUser = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id,)
            res.status(200).json("User has been deleted.")
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can delete only your account."))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(createError(404, "user not found."))
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error)
    }

}
export const subscribe = async (req, res, next) => {
    try {
        //req.user.id is the user loged in
        //req.params.id is the user subscribed by the login user
        //push subscribed user id to the login user subscribedUsers field.
        if (req.user.id === req.params.id) {
            return res.status(409).json("you can not subscribe yourself. :)")
        }
        const { subscribedUsers } = await User.findById(req.user.id)
        const isSubscribedUser = subscribedUsers.includes(req.params.id)
        if (isSubscribedUser) {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: {
                    subscribedUsers: req.params.id
                }
            })
            //decrease the number of subscribers in be subscribed user.
            await User.findByIdAndUpdate(req.params.id, {
                $inc: {
                    subscribers: -1
                }
            })
            return res.status(200).json("unsubscription successfull.")
        }
        else {
            await User.findByIdAndUpdate(req.user.id, {
                $addToSet: {
                    subscribedUsers: req.params.id
                }
            })
            //increase the number of subscribers in be subscribed user.
            await User.findByIdAndUpdate(req.params.id, {
                $inc: {
                    subscribers: 1
                }
            })
        }
        res.status(200).json("subscription successfull.")
    } catch (error) {
        next(error)
    }
}

export const like = async (req, res, next) => {

    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("video has been liked.")
    } catch (error) {
        next(error)
    }
}
export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("video has been disliked.")
    } catch (error) {
        next(error)
    }
}
