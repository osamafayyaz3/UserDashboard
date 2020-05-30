const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Courses = mongoose.model('Courses', CourseSchema);
module.exports = Courses;