const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index');

chai.use(chaiHttp);

const expect = chai.expect;

describe('API Endpoints', () => {
  describe('GET /api/users', () => {
    it('should get all users for the current agent', async () => {
      const res = await chai.request(app).get('/api/users');
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      // Add more assertions as needed
    });
  });

  describe('GET /api/agents', () => {
    it('should get all agents', async () => {
      const res = await chai.request(app).get('/api/agents');
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      // Add more assertions as needed
    });
  });

  // Add more test cases for other endpoints
});
