const db = require('../util/database');

module.exports = class user {
    constructor(id, name, email, password){
        this.id = id,
        this.name= name,
        this.email= email,
        this.password=password
    }

    save(){
        return db.execute(
            `INSERT INTO user(name, email, password) VALUES (?,?,?)`,
            [this.name, this.email, this.password]
        );

    }
    static findByEmail(email){
        return db.execute(`SELECT * FROM user WHERE email = ?`,[email]);
    }
};