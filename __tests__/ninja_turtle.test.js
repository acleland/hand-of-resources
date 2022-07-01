const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const NinjaTurtle = require('../lib/models/NinjaTurtle');

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
  {
    id: '3',
    name: 'Raphael',
    mask_color: 'Red',
    weapon: 'Sai',
  },
  {
    id: '4',
    name: 'Michelangelo',
    mask_color: 'Orange',
    weapon: 'Nunchaku',
  },
];

describe.skip('test routes for /turtles resource', () => {
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
    const updated = await NinjaTurtle.getById(1);
    expect(updated).toHaveProperty('mask_color', 'Pink');
  });

  it('DELETE /turtles/:id', async () => {
    const res = await request(app).delete('/turtles/3');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(turtles[2]);
    const turtles_after_delete = await NinjaTurtle.getAll();
    expect(turtles_after_delete).toEqual(
      turtles.filter((turtle) => turtle.id !== '3')
    );
  });

  afterAll(() => {
    pool.end();
  });
});
