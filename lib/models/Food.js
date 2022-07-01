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

  static async insert({ name, tastiness, healthiness }) {
    const { rows } = await pool.query(
      `
    INSERT INTO foods (name, tastiness, healthiness) VALUES 
    ($1, $2, $3) RETURNING *`,
      [name, tastiness, healthiness]
    );
    return new Food(rows[0]);
  }

  static async updateById(id, attrs) {
    const food = await Food.getById(id);
    if (!food) return null;
    const { name, tastiness, healthiness } = { ...food, ...attrs };
    const { rows } = await pool.query(
      `
    UPDATE foods SET name=$2, tastiness=$3, healthiness=$4
    WHERE id=$1 RETURNING *`,
      [id, name, tastiness, healthiness]
    );
    return new Food(rows[0]);
  }
};
