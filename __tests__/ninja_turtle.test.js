const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return list of ninja turtles', async () => {
    const res = await request(app).get('/turtles');
    const leo = res.body.find((turtle) => turtle.id === '1');
    expect(leo).toHaveProperty('name', 'Leonardo');
    expect(leo).toHaveProperty('mask_color', 'Blue');
    expect(leo).toHaveProperty('weapon', 'Katana');
  });
  afterAll(() => {
    pool.end();
  });
});
