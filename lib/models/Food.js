const pool = require('../utils/pool');

module.exports = class Food {
  id;
  name;
  tastiness;
  healthiness;

  constructor(row) {
    Object.keys(row).forEach((key) => (this[key] = row[key]));
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM foods;
    `);
    return rows.map((row) => new Food(row));
  }
};
