const knex = require("./config/db");
const {Model} = require("objection");
const PORT = process.env.PORT;
const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
const {format } = require('date-fns');
//Classes
const User = require("./models/Person");
//Intacing the model with the knex sql.
Model.knex(knex);   

server.listen(PORT);

//Middlwares
app.use(bodyParser.json());

//Rename this funciton to it's perpose.
async function main(id){
    
    //We use the try catch here because the await blocks the thread. 
    try{
        //Objection provides multiple ways to work with the database, Here is a simple query example. 
        const person = await User.query().findById(id);
        //Date fns makes javascript dates easy to work with here is an example of a simple format.
        if(typeof person.created === "object"){
            const test = format(person.created, 'yyyy-MM-dd');
        }
        return person;
    }catch(e){
        console.error(e);
    }
}

app.get("/:id", async function(req,res){
    const person = await main(req.params.id);
    res.status(200).json({data: person});
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
