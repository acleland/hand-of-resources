const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const TA = require('../lib/models/TA');

const tas = [
  {
    id: '1',
    name: 'Triana',
    pronoun: 'She/her',
    super_power: 'Voice of Compelling',
    description:
      "Triana has the power to compel students to action, usually for the student's own benefit -- for example compelling them to complete their resumes so they can succeed on the job market.",
  },
  {
    id: '2',
    name: 'Tanner',
    pronoun: 'He/him',
    super_power: 'Voice of Soothing',
    description:
      'Tanner can calm a distraught student with his soothing voice.',
  },
  {
    id: '3',
    name: 'Madden',
    pronoun: 'They/he',
    super_power: 'Bugray Vision',
    description:
      "Madden can spot a bug instantly in a vast block of a student's code using their enhanced Bugray Vision.",
  },
];

describe('test routes for /tas resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /tas should return list of tas', async () => {
    const res = await request(app).get('/tas');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(3);
    expect(res.body).toEqual(tas);
  });

  it('GET /tas/:id should return the details for a given TA', async () => {
    const res = await request(app).get('/tas/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(tas[1]);
  });

  it.skip('POST /tas should create a new TA', async () => {
    const res = await request(app)
      .post('/pets')
      .send({ name: 'Euclid', type: 'cat', alive: true });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Euclid');
  });

  it.skip('PUT /tas/:id should update a TA entry', async () => {
    const res = await request(app).put('/tas/1').send({ alive: true });
    expect(res.status).toEqual(200);
    expect(res.body.alive).toEqual(true);
  });

  it.skip('DELETE /tas/:id should delete entry', async () => {
    const res = await request(app).delete('/pets/3');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(tas[2]);
    const pets_after_delete = await TA.getAll();
    expect(pets_after_delete).toEqual(tas.filter((ta) => ta.id !== '3'));
  });

  afterAll(() => {
    pool.end();
  });
});
