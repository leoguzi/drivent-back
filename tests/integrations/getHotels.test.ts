import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";

import server, { init } from "../../src/app";

const route = "/hotels";

describe("Tests for /hotels route", () => {
  beforeAll(async() => {
    await init();
  });

  afterAll(async() => {
    await getConnection().close();
  });

  it("should return status code 200 (ok) and an array of hotels", async() => {
    const response = await supertest(server)
      .get(route)
      .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0MjY0MjA5OX0.HsEKA8Ff7x1_Dq2UICZZMI0g7g_DV7FF63en2GWss6A");

    console.log({ response: response.body });
    expect(response.status).toBe(httpStatus.OK);
  });
});
