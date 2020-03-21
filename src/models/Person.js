const {Model} = require("objection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseModel = require("./BaseModel");

class User extends BaseModel {

    constructor(){
        super();
    }

    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "id";
    }

    async $beforeInsert(queryContext) { // Doing password hashing right before query insert to avoid validation on a hashed password
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
                email: {type: 'string'},
                username: {type: 'string'},
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