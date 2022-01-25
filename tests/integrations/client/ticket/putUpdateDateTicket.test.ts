import supertest from "supertest";

import app, { init } from "../../../../src/app";

import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import Enrollment from "../../../../src/entities/Enrollment";
import Ticket from "../../../../src/entities/Ticket";

import createEvent from "../../../factories/event";
import createUser from "../../../factories/user";
import createSession from "../../../factories/session";
import createEnrollment from "../../../factories/enrollment";

import { clearDatabase, clearTable } from "../../../repositories/deleterRepository";

import closeConnection from "../../../repositories/closeConnection";
import httpStatus from "http-status";
import createTicket from "../../../factories/ticket";

const route = "/tickets/payment";

describe("putUpdateDateTicket", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
  
  beforeAll(async() => {
    await init();
    await clearDatabase();
    await createEvent();

    user = await createUser();
    session = await createSession(user);
    enrollment = await createEnrollment(user);

    await createTicket(enrollment, true, false);
  });
    
  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });
    
  it("should return status code 401 when is invalid token", async() => {
    const response = await supertest(app).put(route)
      .set({ Authorization: `Bearer ${session.token}WRONG` });
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return status code 200 when ticket is not paid", async() => {
    const response = await supertest(app).put(route)
      .set({ Authorization: `Bearer ${session.token}` });
      
    expect(response.status).toBe(httpStatus.OK);
  });

  it("should return status code 409 when ticket has already been paid", async() => {
    const response = await supertest(app).put(route)
      .set({ Authorization: `Bearer ${session.token}` });
      
    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should return status code 404 when no ticket", async() => {
    await clearTable(Ticket);

    const response = await supertest(app).put(route)
      .set({ Authorization: `Bearer ${session.token}` });
      
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});
