
'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('server.js', () => {

  it('should respond with 404 Invalid Route', () => {
    return mockRequest
      .get('/invalidroute')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });

  it('get user should respond 500 for an empty search', () => {
    return mockRequest
      .get('/user')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });

  it('get user should respond properly with keyword', () => {
    return mockRequest
      .get('/user')
      .query({'keyword': 'test'})
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('Get User Should Have Proper Data', () => {
    return mockRequest
      .get('/user')
      .query({'keyword': 'test'})
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toHaveProperty('total_count');
        expect(results.body).toHaveProperty('items');
      });
  });
});