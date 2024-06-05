const db = require('../util/database');

module.exports = class user {
    constructor(id, username, email, phone){
        this.id=id,
        this.username= username,
        this.email = email,
        this.phone = phone
    }
    save(){
        return db.execute(
            'INSERT INTO user (username, email, phone) VALUES (?,?,?)',
            [this.username, this.email, this.phone]
        );
    }

    static deleteByID(id){
        return db.execute('DELETE FROM user WHERE id=?',[id]);
    }

    static fetchALL(){
        return db.execute('SELECT * FROM user');
    }

    // static findById(id){
    //     return db.execute('SELECT * FROM user WHERE user.id=?',[id]);
    // }

};