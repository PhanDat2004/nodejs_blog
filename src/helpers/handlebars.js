const Handlebars = require('handlebars');

module.exports = {
    // Returns the sum of two numbers for use in Handlebars templates
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-sort-up',
            desc: 'fa-solid fa-sort-down',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sort.type];
        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const result = `<a href="${href}">
                            <i class="${icon}"></i>
                        </a>`;
        return new Handlebars.SafeString(result);
    },
};
