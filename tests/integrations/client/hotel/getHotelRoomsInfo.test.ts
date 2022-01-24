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
import Reservation from "../../../../src/entities/Reservation";

const route = "/hotels/:id/rooms";

describe("getHotelRoomsInfo", () => {
  let user: User;
  let session: Session;
  let enrollment: Enrollment;
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
    await createTicket(enrollment, true, true, "presencial");

    hotel = await createHotel();
    room = await createRoom(hotel);

    expectedBody = [
      {
        id: room.id,
        name: room.name,
        vacancies: room.vacancies,
        reservations: await Reservation.count({ roomId: room.id }),
        hotelId: hotel.id
      }
    ];
  });

  afterEach(async() => {
    await clearTable(Reservation);
    await clearTable(Room);
  });

  afterAll(async() => {
    await clearDatabase();

    await closeConnection();
  });

  it("Should returns status code 200 and hotelRooms list", async() => {
    const response = await supertest(app)
      .get(route.replace(":id", `${hotel.id}`))
      .set({ Authorization: `Bearer ${session.token}` });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expectedBody);
  });

  it("Should returns status code 400 (bad request) when query parameter is invalid", async() => {
    const response = await supertest(app)
      .get(route.replace(":id", "invalid"))
      .set({ Authorization: `Bearer ${session.token}` });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("Should returns status code 401 (unauthorized) when no token is provided", async() => {
    const response = await supertest(app)
      .get(route.replace(":id", `${hotel.id}`))
      .set({ Authorization: "Bearer " });  

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("Should returns status code 204 when there are no rooms", async() => {  
    await clearTable(Reservation);
    await clearTable(Room); 

    const response = await supertest(app)
      .get(route.replace(":id", `${hotel.id}`))
      .set({ Authorization: `Bearer ${session.token}` });   
  
    expect(response.status).toBe(httpStatus.NO_CONTENT);
  });

  it("Should returns status code 204 when there is no hotel with provided id", async() => {  
    await clearTable(Reservation);
    await clearTable(Room); 
    await clearTable(Hotel); 

    const response = await supertest(app)
      .get(route.replace(":id", `${hotel.id}`))
      .set({ Authorization: `Bearer ${session.token}` });   
  
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("Should returns status code 403 when there is no enrollment", async() => {  
    await clearTable(Ticket);
    await clearTable(Address); 
    await clearTable(Enrollment); 

    const response = await supertest(app)
      .get(route.replace(":id", `${hotel.id}`))
      .set({ Authorization: `Bearer ${session.token}` });   
  
    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });
});

