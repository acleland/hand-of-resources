const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Food = require('../lib/models/Food');

const foods = [
  { id: '1', name: 'Banana', tastiness: 7, healthiness: 8 },
  { id: '2', name: 'Pizza', tastiness: 9, healthiness: 2 },
  { id: '3', name: 'Chicken', tastiness: 7, healthiness: 8 },
  { id: '4', name: 'Broccoli', tastiness: 5, healthiness: 10 },
];

describe('test routes for /foods resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /foods should return list of foods', async () => {
    const res = await request(app).get('/foods');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
    expect(res.body).toEqual(foods);
  });

  it('GET /foods/:id should return the details for a given food', async () => {
    const res = await request(app).get('/foods/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(foods[1]);
  });

  it('POST /foods should create a new food', async () => {
    const res = await request(app).post('/foods').send({
      name: 'Grilled Cheese',
      tastiness: 8,
      healthiness: 4,
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Grilled Cheese');
  });

  it('PUT /foods/:id should update a food entry', async () => {
    const res = await request(app).put('/foods/1').send({ tastiness: 8 });
    expect(res.status).toEqual(200);
    expect(res.body.tastiness).toEqual(8);
  });

  it('DELETE /foods/:id should delete entry', async () => {
    const res = await request(app).delete('/foods/3');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(foods[2]);
    const foods_after_delete = await Food.getAll();
    expect(foods_after_delete).toEqual(foods.filter((ta) => ta.id !== '3'));
  });

  afterAll(() => {
    pool.end();
  });
});
