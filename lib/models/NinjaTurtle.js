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

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM ninja_turtles WHERE ninja_turtles.id = ($1)`,
      [id]
    );
    if (!rows) return null;
    return new NinjaTurtle(rows[0]);
  }

  static async insert({ name, mask_color, weapon }) {
    const { rows } = await pool.query(
      `
      INSERT INTO ninja_turtles (name, mask_color, weapon) VALUES
      ($1, $2, $3) RETURNING *
      `,
      [name, mask_color, weapon]
    );
    return new NinjaTurtle(rows[0]);
  }

  static async updateById(id, attrs) {
    const turtle = await NinjaTurtle.getById(id);
    if (!turtle) return null;
    const { name, mask_color, weapon } = { ...turtle, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE ninja_turtles SET name=$2, mask_color=$3, weapon=$4
      WHERE id=$1 RETURNING *
    `,
      [id, name, mask_color, weapon]
    );
    return new NinjaTurtle(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM ninja_turtles WHERE id = $1 RETURNING *
    `,
      [id]
    );
    return new NinjaTurtle(rows[0]);
  }
}

module.exports = NinjaTurtle;
