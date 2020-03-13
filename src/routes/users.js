const express = require('express');
const router = express.Router();
const User = require("../models/Person");


async function getUser(id) {
    //We use the try catch here because the await blocks the thread.
    try {
        //Objection provides multiple ways to work with the database, Here is a simple query example.
        const person = await User.query().findById(id);
        //Date fns makes javascript dates easy to work with here is an example of a simple format.
        if (typeof person.created === "object") {
            const test = format(person.created, 'yyyy-MM-dd');
        }
        return person;
    } catch (e) {
        console.error(e);
    }
}

async function createUser(newUser) {
    try {
        const user = await User.query()
            .insert(newUser)
        return user;
    } catch (err) {
        console.log(err)
        return err;
    }

}

router.get("/:id", async function (req, res) {
    const person = await getUser(req.params.id);
    res.status(200).json({data: person});
});

router.post("/", async function (req, res) {
    const result = await createUser(req.body)
    if(result.name === 'ValidationError') {  // not sure how to handle errors yet.
        res.status(result.statusCode).send(result)
        return;
    }
    res.send(result)
})


module.exports = router;