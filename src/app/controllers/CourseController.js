const Course = require('../models/Course');

class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) =>
                res.render('courses/show', {
                    course,
                }),
            )
            .catch(next);
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        console.log(req.body);
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLA5JK2Hp3wdSVJg_GCcRsUQtrKHTw`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
