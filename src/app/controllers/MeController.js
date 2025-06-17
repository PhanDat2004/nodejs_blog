const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('me/stored-courses', {
                    courses,
                });
            })
            .catch(next);
    }

     // [GET] /me/trash/courses
trashCourses(req, res, next) {
        Course.findDeleted({deletedAt: { $ne: null }})
        .lean()
              .then((courses) => {
                res.render('me/trash-courses', {
                    courses,
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
