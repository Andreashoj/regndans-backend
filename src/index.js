const config = require("../knexfile");
const knex = require("knex")(config);
const {Model} = require("objection");
const PORT = process.env.PORT;
const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const users = require("./routes/users");
const io = require("socket.io")(server);
const draw = require("./routes/draw");

//Intacing the model with the knex sql.
Model.knex(knex);

server.listen(PORT);

//Middlwares
app.use(bodyParser.json());
app.use('/api/draw', draw);
app.use('/api/users', users);

io.on("connection", function (socket) {

    socket.on("chat", function (data) {
        io.sockets.emit("chat", data);
    });

    socket.on("graph", function (data) {
        console.log(data);
        io.sockets.emit("graph", data);
    })

    socket.on("data", function (data) {
        io.emit("test", data);
    });
});    