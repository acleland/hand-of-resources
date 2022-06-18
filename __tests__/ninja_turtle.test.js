const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const turtles = [
  {
    id: '1',
    name: 'Leonardo',
    mask_color: 'Blue',
    weapon: 'Katana',
  },
  {
    id: '2',
    name: 'Donatello',
    mask_color: 'Purple',
    weapon: 'Bō',
  },
];

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /turtles should return list of ninja turtles', async () => {
    const res = await request(app).get('/turtles');
    expect(res.body.length).toEqual(4);
    const leo = res.body.find((turtle) => turtle.id === '1');
    expect(leo).toHaveProperty('name', 'Leonardo');
    expect(leo).toHaveProperty('mask_color', 'Blue');
    expect(leo).toHaveProperty('weapon', 'Katana');
  });

  it('GET /turtles/:id should return the details for a given turtle', async () => {
    const res = await request(app).get('/turtles/2');
    expect(res.body).toEqual(turtles[1]);
  });

  it('POST /turtles should create a new ninja turtle', async () => {
    const res = await request(app)
      .post('/turtles')
      .send({ name: 'Picasso', mask_color: 'Yellow', weapon: 'Paintbrush' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Picasso');
  });

  it('PUT /turtles/:id should update a turtle entry', async () => {
    const res = await request(app)
      .put('/turtles/1')
      .send({ mask_color: 'Pink' });
    expect(res.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
