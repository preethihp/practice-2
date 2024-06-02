const path = require('path');
const fs = require('fs');

exports.getLogin = ((req, res) => {
    res.sendFile(path.join(__dirname, '../','views','login.html'));
});

exports.postLogin = ((req, res) => {
    res.redirect('/');
});

exports.getMessage = ((req,res)=>{
    fs.readFile('message.txt', (err, data)=>{
        if (err){
            console.log(err);
            data="No chat exists";
        }
        
        res.sendFile(path.join(__dirname,'../','views','message.html'));
    });
});

exports.postMessage = ((req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.appendFile('message.txt', `${req.body.username} : ${req.body.message}  `,(err)=>{
        err ? console.log(err) : res.redirect('/');
    });
   
});

exports.getContact = ((req, res) => {
    res.sendFile(path.join(__dirname, '../','views','contactus.html'));
});

exports.postContact = ((req, res) => {
    res.send("<h1>Form successfuly filled</h1>");
    res.redirect('/');
});
