// Simple datetime implementation for validate.js (using moment.js)
validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function (value, options) {
        return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function (value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
    }
});

const constraints = {
    firstname: {
        presence: true,
    },
    lastname: {
        presence: true,
    },
    birthday: {
        presence: true,
        datetime: {
            dateOnly: true,
            latest: moment.utc(),
            message: "can't be after today"
        }
    },
    gender: {
        presence: true,
    },
    email: {
        presence: true,
        email: true
    },
    phone: {
        presence: true,
        numericality: {
            message: "must be numeric"
        },
        length: {
            minimum: 10,
            message: "must be at least 10 digits"
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            firstname: null,
            lastname: null,
            birthday: null,
            gender: null,
            email: null,
            phone: null,
            errors: null,
        }
    },
    methods: {
        checkForm() {
            this.errors = validate({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    birthday: this.birthday,
                    gender: this.gender,
                    email: this.email,
                    phone: this.phone
                },
                constraints)
            if (!this.errors) {
                alert("Your profile is updated successfully.");
            }
        }
    }
})

rootComponentInstance = app.mount('#app');