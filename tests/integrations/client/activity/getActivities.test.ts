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
    await createActivity();
    
    user = await createUser();
    session = await createSession(user);
    enrollment = await createEnrollment(user);
    ticket = await createTicket(enrollment, true, true, "presencial");
  });
    
  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });
});
