import createRoom from "../../../factories/room";
import createHotel from "../../../factories/hotel";
import createEnrollment from "../../../factories/enrollment";
import createSession from "../../../factories/session";
import createUser from "../../../factories/user";
import app, { init } from "../../../../src/app";
import supertest from "supertest";
import User from "../../../../src/entities/User";
import Session from "../../../../src/entities/Session";
import ReservationData from "../../../../src/interfaces/reservation";
import deleterRepository from "../../../repositories/deleterRepository";
import Reservation from "../../../../src/entities/Reservation";

beforeAll(async() => {
  await init();
});

let mockUser: User;
let mockSession: Session;

beforeAll(async() => {
  mockUser = await createUser("Name");
  mockSession = await createSession(mockUser);
});

describe("saveReservationInfo", () => {
  it("should return 201", async() => {
    const enrollment = await createEnrollment(mockUser);
    const hotel = await createHotel();
    const room = await createRoom(hotel);
    const body: ReservationData = {
      enrollmentId: enrollment.id, 
      roomId: room.id
    }; 
    const result = await supertest(app).post("/reservation").send(body).set({ Authorization: `Bearer ${mockSession.token}` });
    expect(result.status).toEqual(201);
  });

  //salvar reserva de um quarto que está cheio
});

afterAll(async() => {
  await deleterRepository(Reservation);
});
