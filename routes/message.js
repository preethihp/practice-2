const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express.Router();



app.get('/',(req,res)=>{
    fs.readFile('message.txt', (err, data)=>{
        if (err){
            console.log(err);
            data="No chat exists";
        }
        
        res.sendFile(path.join(__dirname,'../','views','message.html'));
    });
    
    
    
});

app.post('/', (req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.appendFile('message.txt', `${req.body.username} : ${req.body.message}  `,(err)=>{
        err ? console.log(err) : res.redirect('/');
    });
   
});

module.exports = app;