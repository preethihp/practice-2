const express = require('express');
const fs = require('fs');

const app = express.Router();



app.get('/',(req,res)=>{
    fs.readFile('message.txt', (err, data)=>{
        if (err){
            console.log(err);
            data="No chat exists";
        }
        res.send(
            `${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
        <input id="message" type="text" name="message" placeHolder="Enter message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button>
        </form>
        `);
    });
    
    
    
});

app.post('/', (req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.appendFile('message.txt', `${req.body.username}: ${req.body.message}`,(err)=>{
        err ? console.log(err) : res.redirect('/');
    });
   
});

module.exports = app;