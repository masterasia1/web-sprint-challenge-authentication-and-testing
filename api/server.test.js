const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("./server.js")

const user = {username: "sty", password: "news"}

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async ()=>{
  await db("users").truncate()
})
afterAll(async ()=>{
  await db.destroy()
})

it("return number of users", async ()=>{
  let res
  await db("users").insert(user)
  res = await db("users")
  expect(res).toHaveLength(1)

})