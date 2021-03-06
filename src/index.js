require("dotenv").config();
const config = require("../knexfile");
const knex = require("knex")(config);
const {Model} = require("objection");
const PORT = process.env.PORT;
const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const users = require("./routes/users");
const auth = require("./routes/auth");
const io = require("socket.io")(server);
const draw = require("./routes/draw");
const cors = require("cors")

if(!process.env.jwtPrivate) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}


const files = require("./routes/fileUpload");
//Intacing the model with the knex sql.
Model.knex(knex);

server.listen(PORT);

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api/draw', draw);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/uploads', files);

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