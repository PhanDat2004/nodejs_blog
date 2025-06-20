const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort)
        let courseQuery = Course.find({});

        if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: res.locals._sort.type,
            });
        }

        Promise.all([
            courseQuery.lean(),
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
