const app = require('../dist/server');
const http = require('http');	
const supertest = require('supertest')

const server = http.createServer(app);

const request = supertest.agent(server) 

describe('Endpoint "/"', () => {
    it('Gets index on /', async done => {
        const response = await request.get('/');
        expect(response.status).toBe(200)
        expect(response.headers['Content-Type']).toBe('text/html')
        done();
    });
    it('Throws 404 on not registered route', async done => {
        const response = await request.get('/je-ne-exist-pas');
        expect(response.status).toBe(404)
        done();
    })
})