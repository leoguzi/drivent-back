import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";

import server, { init } from "../../../../src/app";
import createUser from "../../../factories/user";
import createEnrollment from "../../../factories/enrollment";
import createSession from "../../../factories/session";
import createTicket from "../../../factories/ticket";
import deleteAll from "../../../repositories/deleterRepository";
import Ticket from "../../../../src/entities/Ticket";

const route = "/hotels";

describe("Tests for /hotels route", () => {
  beforeAll(async() => {
    await init();
  });

  afterAll(async() => {
    await getConnection().close();
  });

  afterEach(async() => {
    await deleteAll(Ticket);
  });

  it("should return status code 200 (ok) and an array of hotels", async() => {
    const mockUser = await createUser();
    const mockEnrollment = await createEnrollment(mockUser);
    const mockSession = await createSession(mockUser);
    const mockTicket = await createTicket(mockEnrollment);
    const response = await supertest(server)
      .get(route)
      .set("authorization", `Bearer ${mockSession.token}`);

    console.log({ response: response.body });
    expect(response.status).toBe(httpStatus.OK);
  });
});
