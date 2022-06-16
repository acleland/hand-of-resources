const pool = require('../utils/pool');

class NinjaTurtle {
  id;
  name;
  mask_color;
  weapon;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.mask_color = row.mask_color;
    this.weapon = row.weapon;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM ninja_turtles;
    `);
    return rows.map((row) => new NinjaTurtle(row));
  }
}

module.exports = NinjaTurtle;
