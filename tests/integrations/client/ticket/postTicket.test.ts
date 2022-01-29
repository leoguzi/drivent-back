import supertest from "supertest";

import app, { init } from "../../../../src/app";

import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import Enrollment from "../../../../src/entities/Enrollment";
import Ticket from "../../../../src/entities/Ticket";
import Address from "../../../../src/entities/Address";

import createEvent from "../../../factories/event";
import createUser from "../../../factories/user";
import createSession from "../../../factories/session";
import createEnrollment from "../../../factories/enrollment";

import { clearDatabase, clearTable } from "../../../repositories/deleterRepository";

import closeConnection from "../../../repositories/closeConnection";
import httpStatus from "http-status";
import createTicket from "../../../factories/ticket";

const route = "/tickets";

describe("postTicketInfo", () => {
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
  });
    
  afterEach(async() => {
    await clearTable(Ticket);
  });

  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });
    
  it("Should return status code 201 if registers a ticket", async() => {
    const ticketInfo = {
      type: "presential",
      withHotel: true
    };
      
    const response = await supertest(app).post(route)
      .set({ Authorization: `Bearer ${session.token}` })
      .send(ticketInfo);
      
    const ticket = await Ticket.getTicketWithValueByEnroll(enrollment);
      
    expect(ticket).toEqual({
      id: expect.any(Number),
      type: ticketInfo.type,
      paymentDate: null,
      withHotel: ticketInfo.withHotel,
      enrollmentId: enrollment.id,
      value: 600
    });
    
    expect(response.status).toBe(httpStatus.CREATED);
  });
    
  it("Should return status code 409 if user already has a ticket", async() => {
    const ticketInfo = {
      type: "presential",
      withHotel: true
    };
      
    await createTicket(enrollment, true, true, "presencial");
      
    const response = await supertest(app).post(route)
      .set({ Authorization: `Bearer ${session.token}` })
      .send(ticketInfo);
    
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
    
  it("Should return status code 401 if user is not authenticated", async() => {
    const ticketInfo = {
      type: "presential",
      withHotel: true
    };
      
    const response = await supertest(app).post(route)
      .set({ Authorization: "Bearer " })
      .send(ticketInfo);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("Should return status code 403 (Forbidden) if user is not enrolled", async() => {
    const ticketInfo = {
      type: "presential",
      withHotel: true
    };
      
    await clearTable(Address);
    await clearTable(Enrollment);

    const response = await supertest(app).post(route)
      .set({ Authorization: `Bearer ${session.token}` })
      .send(ticketInfo);
    
    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });
});
