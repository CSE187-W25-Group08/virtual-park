import { vi, test, beforeAll, afterAll, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'
import { AuthService } from '../src/auth/service'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})

afterAll(() => {
  db.shutdown()
  server.close()
})

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      async check() {
        return { id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a' }
      }
    }
  }
})

const accessToken = "placeholder"

test('Get all permitType', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        PermitType {
          type
          price
        }
      }`
    })
    .then((res) => {
      expect(res.body.data.PermitType.length).toEqual(4)

    })
})
test('retrieve all the permits belong to the specific user', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        permitsByDriver {
          issueDate
          expDate
          type
        }
      }`
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.permitsByDriver.length).toEqual(3)
    })
})

test('retrieve the active permit belonging to the specific user', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        validPermit {
          issueDate
          expDate
          type
        }
      }`
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.validPermit).not.toBeNull()
    })
})

test('retrieve the permit info based on the vehicle car plate', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query GetPermitByCar($input: String!) {
          getPermitBycarPlate(input: $input) {
            permitID
            permitType
            issueDate
            expDate
            isValid
          }
        }
      `,
      variables: {
        input: '123BC4A'
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.getPermitBycarPlate.length).toEqual(3)
    })
})

test('should return empty array with not exist car plate number', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query GetPermitByCar($input: String!) {
          getPermitBycarPlate(input: $input) {
            permitID
            permitType
            issueDate
            expDate
            isValid
          }
        }
      `,
      variables: {
        input: '123BC1'
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.getPermitBycarPlate.length).toEqual(0)
    })
})

const daily = '9b968eea-9abe-457c-ae79-1b128074f683';
const VehicleId = 'f94b39b3-fcc3-4f00-a02a-29ffc06a9365';
test('should issue a daily permit', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
          mutation ($permitTypeId: String!, $vehicleId: String!) {
            issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId) {
              driverID
              vehicleID
              permitType
              issueDate
              expDate
              isValid
            }
          }
        `,
      variables: {
        permitTypeId: daily,
        vehicleId: VehicleId
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      // console.log('issue permit details', res.body.data.issuePermit)
      expect(res.body.data.issuePermit).toBeDefined()
      const permit = res.body.data.issuePermit;
      const issueDate = new Date(permit.issueDate);
      const expDate = new Date(permit.expDate);
      expect(issueDate.toDateString()).toEqual(expDate.toDateString());
      expect(expDate.getHours()).toBe(23);
      expect(expDate.getMinutes()).toBe(59);
    })
})

const week = '8616e7a7-bd6e-45e2-9809-ed22c727a6da';
const SecondVehicleId = 'a74ab65d-f1ec-48b0-852b-5e9a486fc323';
test('should issue a weekly permit', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
          mutation ($permitTypeId: String!, $vehicleId: String!) {
            issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId) {
              driverID
              vehicleID
              permitType
              issueDate
              expDate
              isValid
            }
          }
        `,
      variables: {
        permitTypeId: week,
        vehicleId: SecondVehicleId
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.issuePermit).toBeDefined()
      const permit = res.body.data.issuePermit;
      const issueDate = new Date(permit.issueDate);
      const ExpDate = new Date(issueDate);
      ExpDate.setDate(ExpDate.getDate() + 7);
      expect(issueDate.toDateString()).not.toEqual(ExpDate.toDateString());
      // console.log('issue date details', issueDate, ExpDate)
    })
})

const month = '7acb1a82-c27a-4440-ace7-6d47add695dd';
const ThirdVehicleId = 'ca755b1a-975c-4543-983f-888897db3cab';
test('should issue a monthly permit', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
          mutation ($permitTypeId: String!, $vehicleId: String!) {
            issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId) {
              driverID
              vehicleID
              permitType
              issueDate
              expDate
              isValid
            }
          }
        `,
      variables: {
        permitTypeId: month,
        vehicleId: ThirdVehicleId
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.issuePermit).toBeDefined()
      const permit = res.body.data.issuePermit;
      const issueDate = new Date(permit.issueDate);
      const ExpDate = new Date(issueDate);
      ExpDate.setMonth(ExpDate.getMonth() + 1);
      expect(issueDate.getMonth()).toEqual(ExpDate.getMonth() - 1);
    })
})

const year = '5ed85022-ec19-4e22-aff8-9a98feddeea9';
const FourthVehicleId = '18fa94fc-4783-42df-a904-7ec17efadca5';
test('should issue a yearly permit', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
          mutation ($permitTypeId: String!, $vehicleId: String!) {
            issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId) {
              driverID
              vehicleID
              permitType
              issueDate
              expDate
              isValid
            }
          }
        `,
      variables: {
        permitTypeId: year,
        vehicleId: FourthVehicleId
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.issuePermit).toBeDefined()
      const permit = res.body.data.issuePermit;
      const issueDate = new Date(permit.issueDate);
      const ExpDate = new Date(issueDate);
      ExpDate.setFullYear(ExpDate.getFullYear() + 1);
      expect(issueDate.getFullYear()).toEqual(ExpDate.getFullYear() - 1);
    })
})

test('should return an error for missing user ID', async () => {
  AuthService.prototype.check = vi.fn().mockResolvedValue({ id: undefined } as { id: string | undefined });
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation ($permitTypeId: String!, $vehicleId: String!) {
          issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId) {
            permitID
            driverID
            vehicleID
            permitType
            issueDate
            expDate
            isValid
          }
        }
      `,
      variables: {
        permitTypeId: '9b968eea-9abe-457c-ae79-1b128074f683',
        vehicleId: 'f94b39b3-fcc3-4f00-a02a-29ffc06a9365'
      }
    })
    .then((res) => {
      expect(res.body.errors[0].message).toBe("UserID invalid");
    });
});

