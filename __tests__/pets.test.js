const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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

  // it('PUT /turtles/:id should update a turtle entry', async () => {
  //   const res = await request(app)
  //     .put('/turtles/1')
  //     .send({ mask_color: 'Pink' });
  //   expect(res.status).toEqual(200);
  // });

  // it('DELETE /turtles/:id', async () => {
  //   const res = await request(app).delete('/turtles/3');
  //   expect(res.status).toEqual(200);
  //   expect(res.body).toEqual(turtles[2]);
  //   const turtles_after_delete = await NinjaTurtle.getAll();
  //   expect(turtles_after_delete).toEqual(
  //     turtles.filter((turtle) => turtle.id !== '3')
  //   );
  // });

  afterAll(() => {
    pool.end();
  });
});
