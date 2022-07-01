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
}

module.exports = TA;
