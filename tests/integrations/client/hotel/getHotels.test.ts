import supertest from "supertest";
import { getConnection } from "typeorm";
import httpStatus from "http-status";

import server, { init } from "../../../../src/app";
import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import Enrollment from "../../../../src/entities/Enrollment";
import Ticket from "../../../../src/entities/Ticket";
import Hotel from "../../../../src/entities/Hotel";
import Room from "../../../../src/entities/Room";

import { clearDatabase, clearTable } from "../../../repositories/deleterRepository";
import createEvent from "../../../factories/event";
import createUser from "../../../factories/user";
import createSession from "../../../factories/session";
import createEnrollment from "../../../factories/enrollment";
import createHotel from "../../../factories/hotel";
import createRoom from "../../../factories/room";
import createTicket from "../../../factories/ticket";
import Address from "../../../../src/entities/Address";

const route = "/hotels";

describe("Tests for /hotels route", () => {
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
    ticket = await createTicket(enrollment, true, true, "presencial");

    hotel = await createHotel();
    room = await createRoom(hotel);

    expectedBody = [
      {
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        roomTypes: [
          room.getRoomType()
        ],
        availableVacancies: room.vacancies
      }
    ];
  });

  afterEach(async() => {
    clearTable(Ticket);
    clearTable(Address);
    clearTable(Enrollment);
  });

  afterAll(async() => {
    await clearDatabase();

    await getConnection().close();
  });

  it("should return status code 200 (ok) and an array of hotels", async() => {
    const response = await supertest(server)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expectedBody);
  });

  it("should return status code 403 (forbidden) when there is no enrollment", async() => {
    const response = await supertest(server)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it("should return status code 403 (forbidden) when there is no ticket", async() => {
    enrollment = await createEnrollment(user);

    const response = await supertest(server)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it("should return status code 403 (forbidden) when ticket isn't paid yet", async() => {
    enrollment = await createEnrollment(user);
    ticket = await createTicket(enrollment, true, false, "presencial");

    const response = await supertest(server)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it("should return status code 403 (forbidden) when ticket doesn't include hotel reservation", async() => {
    enrollment = await createEnrollment(user);
    ticket = await createTicket(enrollment, false, true, "presencial");

    const response = await supertest(server)
      .get(route)
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });
});
