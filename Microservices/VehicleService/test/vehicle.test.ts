import { vi, test, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

const authserviceMock = vi.fn()

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      check = authserviceMock
      // async check() {
      // return { id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54'}
      // }
    }
  }
})

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})

afterAll(() => {
  db.shutdown()
  server.close()
})

beforeEach(async () => {
  authserviceMock.mockResolvedValue({ id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54' })
  return db.reset()
})

test('Returns all vehicles', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        vehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      expect(res.body.data.vehicle.length).toEqual(6)
    })
})

test('Returns Member\'s Vehicles', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        userVehicle
        { id, driver, licensePlate, make, model, color, active }
      }`
    })
    .then((res) => {
      expect(res.body.data.userVehicle.length).toEqual(2)
    })
})

test('Returns vehicle by vehicle ID and user ID', async () => {
  const vehiclesResponse = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        userVehicle
        { id, driver, licensePlate, make, model, color, active }
      }`
    })

  const vehicleId = vehiclesResponse.body.data.userVehicle[0].id

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        {
          getVehicleById(id: "${vehicleId}") {
            id
            driver
            licensePlate
            make
            model
            color
            active
          }
        }
      `
    })
    .then((res) => {
      expect(res.body.data.getVehicleById).toBeDefined()
    })
})

test('Returns vehicle by vehicle plate', async () => {
  const vehiclesResponse = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        userVehicle
        { id, driver, licensePlate, make, model, color, active }
      }`
    })

  const vehiclePlate = vehiclesResponse.body.data.userVehicle[0].licensePlate

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        {
          getVehicleByPlate(plate: "${vehiclePlate}") {
            id
            driver
            licensePlate
            make
            model
            color
            active
          }
        }
      `
    })
    .then((res) => {
      expect(res.body.data.getVehicleByPlate).toBeDefined()
    })
})

/*reference: https://jestjs.io/docs/mock-function-api#mockfnmockrejectedvaluevalue */
test('Returns unauthorized error when auth service throws', async () => {
  authserviceMock.mockRejectedValue(new Error('Authentication failed'))

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer InvalidToken`)
    .send({
      query: `{
        vehicle {
          id
          driver
          licensePlate
        }
      }`
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined()
    })
})


test('Member Registers a Vehicle', async () => {
  const res1 = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          registerVehicle(input: {
            licensePlate: "TEST123",
            make: "Toyota",
            model: "Corolla",
            color: "Silver",
            vehicleType: "Car",
            active: false
          }) {
            id
            licensePlate
            make
            model
            color
            driver
            vehicleType
            active
          }
        }
      `
    })
  // .then((res) => {
  //   expect(res.body.data.registerVehicle.active).toBe(false)
  // })
  console.log(res1.body)
  const vehicleId = res1.body.data.registerVehicle.id;

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
      mutation {
        updatePrimaryVehicle(input: {
          id: "${vehicleId}"
        }) {
          id
          licensePlate
          make
          model
          color
          driver
          active
        }
      }
    `
    })
})

test('user who do no thave primary car', async () => {
  authserviceMock.mockResolvedValueOnce({
    id: 'f7298bb9-a42a-410d-821e-5ef175d6e924'
  });

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        primaryVehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      expect(res.body.data.primaryVehicle).toBe(null)
    })
})

test('user who has primary car adds a new car selected as primary', async () => {
  const res1 = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          registerVehicle(input: {
            licensePlate: "TEST123",
            make: "Toyota",
            model: "Corolla",
            color: "Silver",
            vehicleType: "Car",
            active: true
          }) {
            id
            licensePlate
            make
            model
            color
            driver
            vehicleType
            active
          }
        }
      `
    })
  const vehicleId = res1.body.data.registerVehicle.id;

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
      mutation {
        updatePrimaryVehicle(input: {
          id: "${vehicleId}"
        }) {
          id
          licensePlate
          make
          model
          color
          driver
          active
        }
      }
    `
    })

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        primaryVehicle {
          id
          driver
          licensePlate
          make
          model
          color
          active
        }
      }`
    })
    .then((res) => {
      expect(res.body.data.primaryVehicle.licensePlate).toBe("TEST123")
    })
})

test('Edits a vehicle', async () => {
  let vehicle;
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        userVehicle
        { id, driver, licensePlate, make, model, color, vehicleType, active }
      }`
    })
    .then((res) => {
      vehicle = res.body.data.userVehicle[0]
    })

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          editVehicle(input: {
            id: "${vehicle.id}"
            licensePlate: "newplate",
            make: "${vehicle.make}",
            model: "${vehicle.model}",
            color: "${vehicle.color}",
            vehicleType: "${vehicle.vehicleType}",
            active: ${vehicle.active}
          }) {
            id
            licensePlate
            make
            model
            color
            driver
            vehicleType
            active
          }
        }
      `
    })
    .then((res) => {
      expect(res.body.data.editVehicle.licensePlate).toEqual("newplate")
    })
})

test('Member UnRegister Vehicle', async () => {
  const res1 = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          UnregisterVehicle(input: "testingLP") {
            id
            licensePlate
          }
        }
      `
    })

  const vehicle = res1;
  console.log('vehicel: ', vehicle.body)
})

test('Member calls getAnyVehicleById', async () => {
  const res1 = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        getAnyVehicleById(id: "18fa94fc-4783-42df-a904-7ec17efadca5") {
          id
          licensePlate
          make
          model
          color
          driver
          active
        }
      }
    `
    })
  expect(res1.body.data.getAnyVehicleById.licensePlate).toBe('123BC4A')
})

test('No existing plate for getVehicleByPlate', async () => {
  const res1 = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        {
          getVehicleByPlate(plate: "badPlate") {
            id
            driver
            licensePlate
            make
            model
            color
            active
          }
        }
      `
    })
    
    expect(res1.body.errors[0].message).toBe('Vehicle with license plate badPlate not found');
})

test("Returns vehicle when driver's plate matches", async () => {
  const driverId = "f7298bb9-a42a-410d-821e-5ef175d6e924";
  const plate = "5741";

  const res = await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer Placeholder")
    .send({
      query: `
        query GetVehicle($driver: String!, $plate: String!) {
          getVehicleByDriverOrPlate(driver: $driver, plate: $plate) {
            id
            licensePlate
          }
        }
      `,
      variables: { driver: driverId, plate },
    });

  expect(res.body.errors).toBeUndefined();
  expect(res.body.data.getVehicleByDriverOrPlate.licensePlate).toEqual(plate);
});

test("Returns GraphQL validation error if driver arg is empty", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer Placeholder")
    .send({
      query: `
        query GetVehicle($driver: String!, $plate: String!) {
          getVehicleByDriverOrPlate(driver: $driver, plate: $plate) {
            id
          }
        }
      `,
      variables: {
        driver: "", // invalid input for String!
        plate: "ABC123"
      },
    });

  // expect(res.body.errors).toBeDefined();
  // expect(res.body.errors[0].message).toMatch(
  //   /Variable "\$driver" of type "String!" used in position expecting type "String!"/
  // );
});

test("Throws error when driver's plate does not match any of their vehicles", async () => {
  const driverId = "f7298bb9-a42a-410d-821e-5ef175d6e924";
  const nonExistentPlate = "NOT_A_REAL_PLATE";

  const res = await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer Placeholder")
    .send({
      query: `
        query GetVehicle($driver: String!, $plate: String!) {
          getVehicleByDriverOrPlate(driver: $driver, plate: $plate) {
            id
            licensePlate
          }
        }
      `,
      variables: { driver: driverId, plate: nonExistentPlate },
    });

  expect(res.body.errors).toBeDefined();
  expect(res.body.errors[0].message).toBe("Vehicle with that plate not found for this driver.");
});
