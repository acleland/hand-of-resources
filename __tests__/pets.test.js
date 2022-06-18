const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const pets = [
  { name: 'Rufus', type: 'dog', alive: false },
  { name: 'Roscoe', type: 'dog', alive: false },
  { name: 'Jessica', type: 'dog', alive: false },
  { name: 'Pythagoras', type: 'cat', alive: true },
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

  // it('GET /turtles/:id should return the details for a given turtle', async () => {
  //   const res = await request(app).get('/turtles/2');
  //   expect(res.body).toEqual(turtles[1]);
  // });

  // it('POST /turtles should create a new ninja turtle', async () => {
  //   const res = await request(app)
  //     .post('/turtles')
  //     .send({ name: 'Picasso', mask_color: 'Yellow', weapon: 'Paintbrush' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.name).toBe('Picasso');
  // });

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
