const express = require('express');
const {ensureAuthenticated} = require('../config/auth')
const Course = require('../models/Courses')
const User = require('../models/User')
const router = express.Router();

//Welcome Page
router.get('/', (req, res) => {
    res.render('welcome')
})

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const data = await Course.find({})
    const user = await User.findOne({email: req.user.email}).populate('courses')
    console.log(user)
    // console.log(data)
    res.render('dashboard', {
        user: user
    })
    
})

router.post('/dashboard', (req, res) => {
    const { course } = req.body
    const newCourse = new Course({
        courseName: course,
        // creator: '5ed1d84d6ca3382f8f526299'
    })
    newCourse.save()
    .then(() => {
        User.findOne({email: req.user.email})
        .then(user => {
            user.save(user.courses.push(newCourse))
        })
        .catch()
        res.redirect('/dashboard')
    })
    .catch(err => console.log(err))
    // res.send(req.body)
    
})


module.exports = router;