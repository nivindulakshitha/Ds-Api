const mongoose = require("mongoose")
const DocSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: "John Smith"
    },
    title: {
        type: String,
        required: true,
        default: "සුභ අලුත් අවුරුද්දක් වේවා!"
    },
    message: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Doc = mongoose.model("Doc", DocSchema, "Docs");
module.exports = Doc;