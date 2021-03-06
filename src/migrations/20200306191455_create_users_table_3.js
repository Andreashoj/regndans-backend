exports.up = function (knex) {
    return knex.schema.createTable("users", table => {
        table.increments("userId").primary();
        table.string("username");
        table.string("email");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};

