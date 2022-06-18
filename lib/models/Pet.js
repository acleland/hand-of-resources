const pool = require('../utils/pool');

class Pet {
  id;
  name;
  type;
  alive;

  constructor(row) {
    Object.keys(row).forEach((key) => (this[key] = row[key]));
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM pets;
    `);
    return rows.map((row) => new Pet(row));
  }
}

module.exports = Pet;
