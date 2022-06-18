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

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM pets WHERE id = $1
    `,
      [id]
    );
    if (!rows) return null;
    return new Pet(rows[0]);
  }

  static async insert({ name, type, alive }) {
    const { rows } = await pool.query(
      `
    INSERT INTO pets (name, type, alive) VALUES 
    ($1, $2, $3) RETURNING *`,
      [name, type, alive]
    );
    return new Pet(rows[0]);
  }
}

module.exports = Pet;
