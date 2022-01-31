import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../../../src/app";
import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import Enrollment from "../../../../src/entities/Enrollment";
import Ticket from "../../../../src/entities/Ticket";
import Activity from "../../../../src/entities/Activity";

import { clearDatabase, clearTable } from "../../../repositories/deleterRepository";
import closeConnection from "../../../repositories/closeConnection";

import createEvent from "../../../factories/event";
import createUser from "../../../factories/user";
import createSession from "../../../factories/session";
import createEnrollment from "../../../factories/enrollment";
import createTicket from "../../../factories/ticket";
import createActivity from "../../../factories/activity";
import Address from "../../../../src/entities/Address";

const route = "/activities";

describe("Tests for /activities route", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
  let ticket: Ticket;
  let activity: Activity;

  beforeAll(async() => {
    await init();
    await clearDatabase();
    await createEvent();
    
    user = await createUser();
    session = await createSession(user);
    enrollment = await createEnrollment(user);
    ticket = await createTicket(enrollment, true, true, "presencial");
    activity = await createActivity();
  });
    
  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });

  it("returns status 200 and a list of activities if sucess", async() => {
    const result = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);
    
    expect(result.status).toBe(httpStatus.OK);
    expect(result.body[0]).toEqual({
      date: expect.any(String),
      mainAuditorium: expect.any(Array),
      sideAuditorium: expect.any(Array),
      workshopRoom: expect.any(Array),
    });
  });

  it("returs 404 (NotFound) if user has no ticket", async() => {
    await clearTable(Ticket);

    const result = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);
    expect(result.status).toBe(httpStatus.NOT_FOUND);
  });

  it("returs 403 (forbidem) if user ticket is not paid", async() => {
    await createTicket(enrollment, true, false, "presencial");
    
    const result = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);
    expect(result.status).toBe(httpStatus.FORBIDDEN);
  });

  it("returs 403 (forbidem) if user is not enrolled", async() => {
    await clearTable(Ticket);
    await clearTable(Address);
    await clearTable(Enrollment);

    const result = await supertest(app)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);
    expect(result.status).toBe(httpStatus.FORBIDDEN);
  });
});
