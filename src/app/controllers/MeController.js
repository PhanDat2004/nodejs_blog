const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).lean(),
            Course.countDocumentsDeleted({ deletedAt: { $ne: null } }),
        ])
            .then(([courses, deletedCount]) => {
                console.log('Deleted count:', deletedCount);
                res.render('me/stored-courses', {
                    courses,
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({ deletedAt: { $ne: null } })
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
