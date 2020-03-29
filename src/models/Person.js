const {Model} = require("objection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseModel = require("./BaseModel");

class User extends BaseModel {

    constructor() {
        super();
    }

    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "id";
    }

    // This method is called right before a query().insert is called on the User model
    async $beforeInsert(queryContext) {
        //Check if user email already exist when trying to create a user.
        const email = await User.query().where('email', this.email).first();
        if (email) {
            throw {
                data: {
                    email: 'Already Exists.'
                },
                statusCode: 400
            };
        }

        // Doing password hashing right before query insert to avoid validation on a hashed password
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

    generateAuthToken() {
        const token = jwt.sign({_id: this.id}, process.env.jwtPrivate);
        return token;
    }

    getUsername() { // just to test methods
        return this.username
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'username', 'password'],

            properties: {
                id: {type: 'integer'},
                email: {
                    type: 'string',
                    format: 'email'
                },
                username: {
                    type: 'string',
                    minLength: 5,
                    maxLength: 24
                },
                password: {
                    type: 'string',
                    pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                    /*
                        At least one upper case English letter, (?=.*?[A-Z])
                        At least one lower case English letter, (?=.*?[a-z])
                        At least one digit, (?=.*?[0-9])
                        At least one special character, (?=.*?[#?!@$%^&*-])
                        Minimum eight in length .{8,} (with the anchors)
                    */
                }
            },
            additionalProperties: false
        };
    }
}


module.exports = User;