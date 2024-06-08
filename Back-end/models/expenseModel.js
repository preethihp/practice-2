const db = require('../util/database');

class Expense {
    constructor(id, amount, description, category) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.category = category;
    }

    save() {
        return db.execute(
            'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)',
            [this.amount, this.description, this.category]
        );
    }

    static findAll() {
        return db.execute('SELECT * FROM expenses');
    }

    static deleteById(id) {
        return db.execute('DELETE FROM expenses WHERE id = ?', [id]);
    }
}

module.exports = Expense;
