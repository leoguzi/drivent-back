import createEnrollment from "../../../factories/enrollment";
import createSession from "../../../factories/session";
import createUser from "../../../factories/user";
import app, { init } from "../../../../src/app";
import supertest from "supertest";
import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import createHotel from "../../../factories/hotel";
import createRoom from "../../../factories/room";
import Enrollment from "../../../../src/entities/Enrollment";
import createReservation from "../../../factories/reservation";
import Reservation from "../../../../src/entities/Reservation";
import { clearTable } from "../../../repositories/deleterRepository";
import NotFoundReservationError from "../../../../src/errors/NotFoundReservation";

beforeAll(async() => {
  await init();
});

let mockUser: User;
let mockSession: Session;
let mockEnrollment: Enrollment;

beforeAll(async() => {
  mockUser = await createUser("Name");
  mockSession = await createSession(mockUser);
  const mockHotel = await createHotel();
  await createRoom(mockHotel);
  mockEnrollment = await createEnrollment(mockUser);
  await createEnrollment(mockUser);
});

describe("getReservationInfo", () => {
  it("should return status code 200 and the reservation infos", async() => {
    const reservation = await createReservation(mockEnrollment);
    const result = await supertest(app).get("/reservation").set({ Authorization: `Bearer ${mockSession.token}` });
    
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("id", reservation.id);
    expect(result.body).toHaveProperty("enrollmentId", reservation.enrollmentId);
    expect(result.body).toHaveProperty("roomId", reservation.roomId);
    expect(result.body).toHaveProperty("room.id", reservation.room.id);
    expect(result.body).toHaveProperty("room.name", reservation.room.name);
    expect(result.body).toHaveProperty("room.vacancies", reservation.room.vacancies);
    expect(result.body).toHaveProperty("room.hotelId", reservation.room.hotelId);
    expect(result.body).toHaveProperty("room.hotel", reservation.room.hotel);
    expect(result.body).toHaveProperty("room.hotel.id", reservation.room.hotel.id);
    expect(result.body).toHaveProperty("room.hotel.name", reservation.room.hotel.name);
    expect(result.body).toHaveProperty("room.hotel.image", reservation.room.hotel.image);
    expect(result.body).toHaveProperty("room.reservations");
    expect(typeof(result.body.room.reservations)).toEqual("number");
  });
  
  it("should return status code 404 and throw NotFoundReservationError", async() => {
    await clearTable(Reservation);
    const result = await supertest(app).get("/reservation").set({ Authorization: `Bearer ${mockSession.token}` });
    const error = new NotFoundReservationError();   
    
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ message: error.message });
  });
});

afterAll(async() => {
  await clearTable(Reservation);
});
