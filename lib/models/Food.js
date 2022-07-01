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

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM foods WHERE id = $1
    `,
      [id]
    );
    if (!rows) return null;
    return new Food(rows[0]);
  }
};
