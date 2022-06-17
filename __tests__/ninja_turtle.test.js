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
    expect(res.body.length).toEqual(4);
    const leo = res.body.find((turtle) => turtle.id === '1');
    expect(leo).toHaveProperty('name', 'Leonardo');
    expect(leo).toHaveProperty('mask_color', 'Blue');
    expect(leo).toHaveProperty('weapon', 'Katana');
  });

  it('POST /turtles should create a new owner', async () => {
    const res = await request(app)
      .post('/turtles')
      .send({ name: 'Picasso', mask_color: 'Yellow', weapon: 'Paintbrush' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Picasso');
  });

  afterAll(() => {
    pool.end();
  });
});
