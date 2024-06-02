const path = require('path');
const fs = require('fs');
const userModel = require('../models/userModel');

exports.getLogin = ((req, res) => {
    res.sendFile(path.join(__dirname, '../','views','login.html'));
});

exports.postLogin = ((req, res) => {
    res.redirect('/');
});

exports.getMessage = ((req,res)=>{
    userModel.getMessages((err, data)=>{
    
        if (err){
            console.log(err);
            data="No chat exists";
        }
        
        res.sendFile(path.join(__dirname,'../','views','message.html'));
    });
});

exports.postMessage = ((req,res)=>{
    const { username, message } = req.body;
    userModel.appendMessage(username, message, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

exports.getContact = ((req, res) => {
    res.sendFile(path.join(__dirname, '../','views','contactus.html'));
});

exports.postContact = ((req, res) => {
    res.send("<h1>Form successfuly filled</h1>");
    res.redirect('/');
});
