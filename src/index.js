require("dotenv").config();
const PORT = process.env.PORT;
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {Model} = require("objection");
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "admin",
        password: "admin",
        database: "testdb"
    }
});

Model.knex(knex);   

server.listen(PORT);



app.get("/", function(req,res){
    res.send("Hello world");    
});

io.on("connection", function(socket){

    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });

    socket.on("graph", function(data){
        console.log(data);
        io.sockets.emit("graph", data);
    })
    
    socket.on("data", function(data){
        io.emit("test", data);
    });
});
