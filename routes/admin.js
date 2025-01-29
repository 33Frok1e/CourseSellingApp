const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db/db');
const { JWTSECRET } = require('../config');
const jwt = require('jsonwebtoken');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })
    res.json({
        message: "Admin Created Successfully"
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username,
        password
    })
    if(user) {
        const token = jwt.sign({username}, JWTSECRET);
        res.json({
            token
        });
    } else {
        res.status(411).json({ msg: "Invalid credentials" });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    // Add Zod
    try {
        const { title, description, imageLink, price } = req.body;
        const newCourse = await Course.create({
            title,
            description,
            imageLink,
            price
        });
        console.log(newCourse);
        res.json({
            message: "Course Created Successfully", courseId: newCourse._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all course logic
    const response = await Course.find({});

    res.json({
        Courses: response
    })
});

module.exports = router;