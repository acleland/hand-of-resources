const pool = require('../utils/pool');

class TA {
  id;
  name;
  pronoun;
  super_power;
  description;

  constructor(row) {
    Object.keys(row).forEach((key) => (this[key] = row[key]));
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM tas;
    `);
    return rows.map((row) => new TA(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM tas WHERE id = $1`,
      [id]
    );
    if (!rows) return null;
    return new TA(rows[0]);
  }

  static async insert({ name, pronoun, super_power, description }) {
    const { rows } = await pool.query(
      `
      INSERT INTO tas (name, pronoun, super_power, description) VALUES
      ($1, $2, $3, $4) RETURNING *
      `,
      [name, pronoun, super_power, description]
    );
    return new TA(rows[0]);
  }

  static async updateById(id, attrs) {
    const ta = await TA.getById(id);
    if (!ta) return null;
    const { name, pronoun, super_power, description } = { ...ta, ...attrs };
    const { rows } = await pool.query(
      `
    UPDATE tas SET name=$2, pronoun=$3, super_power=$4, description=$5 WHERE id=$1 RETURNING *`,
      [id, name, pronoun, super_power, description]
    );
    return new TA(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM tas WHERE id=$1 RETURNING *`,
      [id]
    );
    return new TA(rows[0]);
  }
}

module.exports = TA;
