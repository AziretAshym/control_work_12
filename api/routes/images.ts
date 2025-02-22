import express from "express";
import Image from "../models/Image";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import mongoose from "mongoose";

const imagesRouter = express.Router();

imagesRouter.get('/', async (req, res, next) => {
    const imageQuery = req.query.image_id;

    try {
        const filter = imageQuery ? { image: imageQuery } : {};
        const albums = await Image.find(filter).populate("user", "displayName avatar");

        res.send(albums);
    } catch (e) {
        next(e);
    }
});

imagesRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    const reqWithUser = req as RequestWithUser;


    const { title } = req.body;

    const newImage = new Image({
        image: req.file ? 'images/' + req.file.filename : null,
        title: title,
        user: reqWithUser.user
    });

    try {
        const createdImage = new Image(newImage);
        await createdImage.save();
        res.send(createdImage);
    } catch (e) {
        next(e);
    }
});

imagesRouter.delete('/:id', auth, permit('user', 'admin'), async (req, res, next) => {
    const imageId = req.params.id;
    const reqWithUser = req as RequestWithUser;

    if (!mongoose.isValidObjectId(imageId)) {
        res.status(400).send({ error: 'Invalid image ID' });
        return;
    }

    try {
        const image = await Image.findById(imageId);

        if (!image) {
            res.status(404).send({ error: 'Image not found' });
            return;
        }

        if (reqWithUser.user.role === 'admin' || image.user.toString() === reqWithUser.user._id.toString()) {
            await Image.deleteOne({ _id: imageId });
            res.send({ message: 'Image deleted successfully' });
        } else {
            res.status(403).send({ error: 'You can not delete this image' });
        }
    } catch (e) {
        next(e);
    }
});



export default imagesRouter;