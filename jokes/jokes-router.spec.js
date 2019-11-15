const request = require("supertest");

const server = require("../api/server.js");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqbGdlbGluYXMzIiwicGFzc3dvcmQiOiIkMmEkMTAkV1E0cENHZjJ4ekVnLlB0NXNWcTE0ZWJ0YWtYQjBZb0lxb3VqVGJwanJmRGE3SGgwSTJ4RmUiLCJpYXQiOjE1NzM4Mzk3NTUsImV4cCI6MTU3MzkyNjE1NX0.HfmYm92yUnDrTAG5-KP9bUmQSdJseF4dD6QccyiO2TY";

describe("server", function() {

  describe("GET /api/jokes/", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/jokes/")
        .set('authorization', token)
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/api/jokes/")
        .set('authorization', token)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should have jokes in the array", function() {
      return request(server)
        .get("/api/jokes/")
        .set('authorization', token)
        .then(res => {
          expect(res.text).not.toHaveLength(0);
          // console.log(res.text);
          // expect(JSON.parse(res.text)).toContain({
          //   "id": "0189hNRf2g",
          //   "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
          // })
        });

    })

    it.todo("should return an array of jokes")
  })
})