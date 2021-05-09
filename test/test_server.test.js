const app = require('../dist/server');
const http = require('http');	
const supertest = require('supertest')

const server = http.createServer(app);

const request = supertest.agent(server) 

describe('Endpoint "/"', () => {
    fit('Gets redirect to /callback', async done => {
        const response = await request.get('/');
        expect(response.status).toBe(200)//redirect
        //expect(response.header.location).toMatch(/(client_id=\d{3,})|(redirect_uri=\\https)|(state)|(\/callback)/g);
        done();
    })
   
})