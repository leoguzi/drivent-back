import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../../../src/app";
import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import Enrollment from "../../../../src/entities/Enrollment";
import Ticket from "../../../../src/entities/Ticket";
import Hotel from "../../../../src/entities/Hotel";
import Room from "../../../../src/entities/Room";

import { clearDatabase, clearTable } from "../../../repositories/deleterRepository";
import closeConnection from "../../../repositories/closeConnection";

import createEvent from "../../../factories/event";
import createUser from "../../../factories/user";
import createSession from "../../../factories/session";
import createEnrollment from "../../../factories/enrollment";
import createTicket from "../../../factories/ticket";
import Address from "../../../../src/entities/Address";

const route = "/tickets";

describe("getTicket", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
  let ticket: Ticket;

  beforeAll(async() => {
    await init();
    await clearDatabase();

    await createEvent();

    user = await createUser();
    session = await createSession(user);
    enrollment = await createEnrollment(user);
  });

  beforeEach(async() => {
    ticket = await createTicket(enrollment, true, false, "presencial");
  });

  afterEach(async() => {
    await clearTable(Ticket);
  });

  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });

  it("should return status code 200 (ok) and ticket without payment date when has no payment", async() => {
    const expectedBody = {
      id: ticket.id,
      type: ticket.type,
      paymentDate: ticket.paymentDate,
      withHotel: ticket.withHotel,
      value: 600,
    };

    const response = await supertest(app).get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expectedBody);
    expect(response.body.paymentDate).toBeNull();
  });

  it("should return status code 200 (ok) and complete ticket object when authenticated", async() => {
    const response = await supertest(app).get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.paymentDate).toBeDefined();
  });

  it("should return status code 200 (ok) and without hotel ticket object", async() => {
    await clearTable(Ticket);
    ticket = await createTicket(enrollment, false, false, "presencial");
    const response = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.withHotel).toBeFalsy();
  });

  it("should return status code 401 (unauthorized) when token is invalid", async() => {
    const response = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}WRONG`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return status code 404 (not found) when user has no ticket", async() => {
    clearTable(Ticket);

    const response = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});
