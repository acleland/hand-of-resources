const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pet = require('../lib/models/Pet');

const pets = [
  { id: '1', name: 'Rufus', type: 'dog', alive: false },
  { id: '2', name: 'Roscoe', type: 'dog', alive: false },
  { id: '3', name: 'Jessica', type: 'dog', alive: false },
  { id: '4', name: 'Pythagoras', type: 'cat', alive: true },
];

describe('test routes for /pets resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /pets should return list of pets', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
    expect(res.body).toEqual(pets);
  });

  it('GET /pets/:id should return the details for a given pet', async () => {
    const res = await request(app).get('/pets/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(pets[1]);
  });

  it('POST /pets should create a new pet', async () => {
    const res = await request(app)
      .post('/pets')
      .send({ name: 'Euclid', type: 'cat', alive: true });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Euclid');
  });

  it('PUT /pets/:id should update a pet entry', async () => {
    const res = await request(app).put('/pets/1').send({ alive: true });
    expect(res.status).toEqual(200);
    expect(res.body.alive).toEqual(true);
  });

  it('DELETE /pets/:id should delete entry', async () => {
    const res = await request(app).delete('/pets/3');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(pets[2]);
    const pets_after_delete = await Pet.getAll();
    expect(pets_after_delete).toEqual(pets.filter((pet) => pet.id !== '3'));
  });

  afterAll(() => {
    pool.end();
  });
});
