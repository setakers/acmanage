const express = require('express');
const config = require('../config/config');
const router = express.Router();
const CourseService = require('../modules/CourseService')
let courseService = new CourseService()

router.get('/query_courses', (req, resp) => {
    courseService.getAllCourses(function(course_query){
        let responseJson = JSON.stringify({tableData: course_query});
        console.log('in publicity, rtn data: ' + course_query);
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
});
module.exports = router;
