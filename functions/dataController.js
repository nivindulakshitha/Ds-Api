const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
require("dotenv").config()
const Doc = require("../models/Doc")
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
})

const registerDoc = async (req, res) => {
    const { username, title, message, likes } = req.body;

    const newDoc = new Doc({
        username: username,
        title: title,
        message: message,
        likes: likes
    })

    try {
        const savedDoc = await newDoc.save();
        return res.status(200).json({ "message": "Doc successfully added", "id": savedDoc._id.toString() });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ "message": "An error occurred while adding the doc", "username": username, "error": error.message });
    }
}

const findDocById = async (req, res) => {
    const { docId } = req.body;
    console.log(docId);

    try {
        const objectId = new ObjectId(docId);
        const doc = await Doc.findById(objectId);

        if (!doc) {
            return res.status(500).json({ "message": "An error occurred while finding the doc", "error": error.message });
        }

        return res.status(200).json({ "message": "Doc successfully found", "doc": doc });
    } catch (error) {
        console.error('Error finding document by ID:', error);
        return res.status(500).json({ "message": "An error occurred while finding the doc", "error": error.message });
    }
}

const updateLikes = async (req, res) => {
    const { docId, likes } = req.body;

    try {
        const doc = await Doc.findById(docId);
        if (!doc) {
            return res.status(404).json({ "message": "No document found with that ID" });
        }

        doc.likes += likes;

        const updatedDoc = await doc.save();
        return res.status(200).json({ "message": "Likes successfully updated", "updatedDoc": updatedDoc });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ "message": "An error occurred while updating the likes", "error": error.message });
    }
}

module.exports = {
    registerDoc,
    findDocById,
    updateLikes
}