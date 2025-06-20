const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoID: { type: String, required: true },
        slug: { type: String, unique: true },
        level: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Custom query helper
CourseSchema.query.sortable = function (req) {
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        return this.sort({
            [req.query.column]: req.query.type,
        });
    }
    return this;
};

// Tự động tạo slug trước khi lưu
CourseSchema.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', CourseSchema);
