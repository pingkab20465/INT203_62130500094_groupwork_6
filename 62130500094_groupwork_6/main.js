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
        presence: {allowEmpty: false, message: "^First Name can't be blank"}
    },
    lastname: {
        presence: {allowEmpty: false, message: "^Last Name can't be blank"},
    },
    birthday: {
        presence: {allowEmpty: false},
        datetime: {
            dateOnly: true,
            latest: moment.utc(),
            message: "can't be after today"
        }
    },
    gender: {
        presence: {allowEmpty: false},
    },
    email: {
        presence: {allowEmpty: false},
        email: true
    },
    phone: {
        presence: {allowEmpty: false, message: "^Phone Number can't be blank"},
        numericality: {
            message: "^Phone Number must be numeric"
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Phone Number must be 10 digits"
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            formData: {
                firstname: null,
                lastname: null,
                birthday: null,
                gender: null,
                email: null,
                phone: null
            },
            errors: {},
        }
    },
    methods: {
        checkForm() {
            this.errors = validate(this.formData, constraints) ? validate(this.formData, constraints) : {};
            if (Object.keys(this.errors).length == 0) {
                alert("Your profile is updated successfully.");
            }
        },
        updateFormDataElement(obj) {
            this.formData[obj.name] = obj.value;
        }
    }
})