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
import createHotel from "../../../factories/hotel";
import createRoom from "../../../factories/room";
import createTicket from "../../../factories/ticket";
import Address from "../../../../src/entities/Address";

const route = "/tickets";

describe("GET /tickets route", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
  let ticket: Ticket;
  let hotel: Hotel;
  let room: Room;
  let expectedBody: any;

  beforeAll(async() => {
    await init();
    await clearDatabase();

    await createEvent();
    
    user = await createUser();
    session = await createSession(user);
    enrollment = await createEnrollment(user);
    ticket = await createTicket(enrollment, true, false, "presencial");

    expectedBody = {
      id: ticket.id,
      type: ticket.type,
      paymentDate: ticket.paymentDate,
      withHotel: ticket.withHotel,
      value: 600,
    };
  });

  afterEach(async() => {
    clearTable(Ticket);
    clearTable(Address);
    clearTable(Enrollment);
  });

  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });

  it("should return status code 200 and ticket object when authenticated", async() => {
    const response = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expectedBody);
  });
});
