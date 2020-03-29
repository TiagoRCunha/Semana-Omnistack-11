const request = require("supertest");
const connection = require("../../src/database/connection");

const app = require("../../src/app");
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it("shoud be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      // .set("Authorization", '<id de alguma ong>')
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "47000000000",
        city: "Rio do Sul",
        uf: "SC"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
