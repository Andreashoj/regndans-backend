require("dotenv").config();
const PORT = process.env.PORT;
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(PORT);

app.get("/", function(req,res){
    res.send("Hello world");    
});

io.on("connection", function(socket){
    console.log("Made a connection", socket.id);
    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });

    socket.on("data", function(data){
        io.emit("test", data);
    });
}); 

io.on("disconnect", function(socket){
    console.log("disconnected");
});