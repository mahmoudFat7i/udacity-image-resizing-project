//your tests
import { describe } from 'node:test'
import supertest from 'supertest'
import app, { port } from '../index'
import { getImage } from '../utils/utils'

const request = supertest(app)

describe('expres server test', () => {
  it('tests the server port', () => {
    expect(port).toBe(3000)
  })
})
describe('endpoints  test', () => {
  it('tests the index endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
  it('tests the api endpoint', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
  })
  it('tests the image endpoint with correct data', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=50&height=30'
    )
    expect(response.status).toBe(200)
  })
  it('tests the image endpoint with missing data', async () => {
    const response = await request.get('/api/images')
    expect(response.status).toBe(400)
  })
})

describe('image processing test', () => {
  it('test image processing function with valid parameters', () => {
    const correctDataParameters = getImage({
      height: 100 as unknown as string,
      width: 100 as unknown as string,
      filename: 'fjord',
    })
    expect(correctDataParameters).toBeTruthy
  })
  it('test image processing function with invalid data', () => {
    const correctDataParameters = getImage({ filename: 'mjm' })
    expect(correctDataParameters).toThrowError
  })
})
