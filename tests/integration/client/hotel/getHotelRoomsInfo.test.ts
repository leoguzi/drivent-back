import createEnrollment from "../../../factories/enrollment";
import createSession from "../../../factories/session";
import createUser from "../../../factories/user";
import app, { init } from "./../../../../src/app";
import supertest from "supertest";
import UnauthorizedError from "../../../../src/errors/Unauthorized";

beforeAll(async() => {
  await init();
});

describe("getHotelRoomsInfo", () => {
  it("Should returns status code 200 and hotelRooms list", async() => {
    const mockUser = await createUser("Name");
    await createEnrollment(mockUser);
    const mockSession = await createSession(mockUser);
    const hotelRooms = await supertest(app).get("/hotels/1/rooms").set({ Authorization: `Bearer ${mockSession.token}` });    
    expect(Array.isArray(hotelRooms.body)).toBeTruthy();
    expect(hotelRooms.status).toBe(200);
  });

  it("Should returns status code 401 and throw UnauthorizedError", async() => {
    const hotelRooms = await supertest(app).get("/hotels/1/rooms").set({ Authorization: "Bearer " });   
    const error = new UnauthorizedError();    
    expect(hotelRooms.status).toBe(401);
    expect(hotelRooms.body).toEqual({ "message": `${error.message}` });
  });

  it("Should returns status code 403 and throw UnauthorizedError", async() => {
    const mockUser = await createUser("Name");
    const mockSession = await createSession(mockUser);
    
    const hotelRooms = await supertest(app).get("/hotels/1/rooms").set({ Authorization: `Bearer ${mockSession.token}` });   
  
    expect(hotelRooms.status).toBe(403);
  });
});

