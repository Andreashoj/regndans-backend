const {Model} = require("objection");
const Joi = require("@hapi/joi");

class User extends Model {

    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'username'],

            properties: {
                id: { type: 'integer'},
                email: { type: 'string'},
                username: { type: 'string'},
                password: {
                    type: 'string',
                    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
                }
            },
            additionalProperties: false
        };
    }
}


module.exports = User;