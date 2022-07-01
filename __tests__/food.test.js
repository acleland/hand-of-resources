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
  it.only('GET /foods should return list of foods', async () => {
    const res = await request(app).get('/foods');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
    expect(res.body).toEqual(foods);
  });

  // it('GET /tas/:id should return the details for a given TA', async () => {
  //   const res = await request(app).get('/tas/2');
  //   expect(res.status).toBe(200);
  //   expect(res.body).toEqual(tas[1]);
  // });

  // it('POST /tas should create a new TA', async () => {
  //   const res = await request(app).post('/tas').send({
  //     name: 'Pete',
  //     pronoun: 'He/him',
  //     super_power: 'Speed-Googling',
  //     description:
  //       'Pete can find solutions quickly with his special Speed-Googling ability',
  //   });
  //   expect(res.status).toBe(200);
  //   expect(res.body.name).toBe('Pete');
  // });

  // it('PUT /tas/:id should update a TA entry', async () => {
  //   const res = await request(app).put('/tas/1').send({ pronoun: 'She/they' });
  //   expect(res.status).toEqual(200);
  //   expect(res.body.pronoun).toEqual('She/they');
  // });

  // it('DELETE /tas/:id should delete entry', async () => {
  //   const res = await request(app).delete('/tas/3');
  //   expect(res.status).toEqual(200);
  //   expect(res.body).toEqual(tas[2]);
  //   const tas_after_delete = await TA.getAll();
  //   expect(tas_after_delete).toEqual(tas.filter((ta) => ta.id !== '3'));
  // });

  afterAll(() => {
    pool.end();
  });
});
