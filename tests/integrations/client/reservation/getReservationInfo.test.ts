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

describe("getReservationInfo", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
  let ticket: Ticket;
  let hotel: Hotel;
  let room: Room;
  let reservation: Reservation;
  let expectedBody: any;
  
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
    reservation = await createReservation(room, enrollment);

    expectedBody = {
      id: reservation.id,
      roomId: reservation.roomId,
      enrollmentId: reservation.enrollmentId,
      room: {
        id: room.id,
        name: room.name,
        vacancies: room.vacancies,
        hotelId: hotel.id,
        reservations: await Reservation.count({ roomId: room.id }),
        hotel: {
          id: hotel.id,
          name: hotel.name,
          image: hotel.image
        }
      }
    };
  });

  afterEach(async() => {
    await clearTable(Reservation);
  });

  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });

  it("should return status code 200 and the reservation infos", async() => {
    const result = await supertest(app).get(route).set({ Authorization: `Bearer ${session.token}` });
    
    expect(result.statusCode).toEqual(httpStatus.OK);
    expect(result.body).toEqual(expectedBody);
  });
  
  it("should return status code 404 when there is no reservation for provided user", async() => {
    const result = await supertest(app).get(route).set({ Authorization: `Bearer ${session.token}` });
    
    expect(result.statusCode).toEqual(httpStatus.NOT_FOUND);
  });

  it("should return status code 403 when there is no enrollment for provided user", async() => {
    await clearTable(Ticket);
    await clearTable(Address);
    await clearTable(Enrollment);
    
    const result = await supertest(app).get(route).set({ Authorization: `Bearer ${session.token}` });
    
    expect(result.statusCode).toEqual(httpStatus.FORBIDDEN);
  });
});

