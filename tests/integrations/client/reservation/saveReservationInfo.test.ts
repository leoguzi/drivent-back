import supertest from "supertest";
import app, { init } from "../../../../src/app";
import httpStatus from "http-status";

import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import Enrollment from "../../../../src/entities/Enrollment";
import Ticket from "../../../../src/entities/Ticket";
import Hotel from "../../../../src/entities/Hotel";
import Room from "../../../../src/entities/Room";
import Reservation from "../../../../src/entities/Reservation";

import { clearDatabase, clearTable } from "../../../repositories/deleterRepository";
import createEnrollment from "../../../factories/enrollment";
import createSession from "../../../factories/session";
import createUser from "../../../factories/user";
import createHotel from "../../../factories/hotel";
import createRoom from "../../../factories/room";
import createReservation from "../../../factories/reservation";
import closeConnection from "../../../repositories/closeConnection";
import createEvent from "../../../factories/event";
import createTicket from "../../../factories/ticket";
import Address from "../../../../src/entities/Address";

const route = "/reservation";

describe("saveReservationInfo", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
  let ticket: Ticket;
  let hotel: Hotel;
  let room: Room;
  let sendBody: any;

  beforeAll(async() => {
    await init();

    await clearDatabase();
    await createEvent();

    user = await createUser();
    session = await createSession(user);

    enrollment = await createEnrollment(user);
    ticket = await createTicket(enrollment, true, true, "presencial");

    hotel = await createHotel();
    room = await createRoom(hotel);

    sendBody = {
      enrollmentId: enrollment.id, 
      roomId: room.id
    };
  });

  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });

  it("should return 201", async() => {
    const result = await supertest(app).post(route).send(sendBody).set({ Authorization: `Bearer ${session.token}` });
    expect(result.status).toEqual(httpStatus.CREATED);
  });
});
