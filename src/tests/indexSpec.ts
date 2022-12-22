//your tests
import supertest from 'supertest';
import app, { port } from '../index';

const request = supertest(app);

const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

    it('tests the server port', async () => {
        const response = await request.get('/api/images');
        expect(port).toBe(3000);
    });
    it('tests the index endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('tests the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it('tests the image endpoint with correct data', async () => {
        const response = await request.get('/api/images?filename=fjord');
        expect(response.status).toBe(200);
    });
    it('tests the image endpoint with missing data', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    });


