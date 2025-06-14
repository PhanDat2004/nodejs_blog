const Course = require('../models/Course');

class SiteController {
    // [GET] /
    async index(req, res) {
        try {
            const courses = await Course.find({});
            res.send(courses);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // [GET] / search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
