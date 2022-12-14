import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
import { IHospitalRequest } from "../../Interfaces/hospital"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import { IScheduleRequest } from "../../Interfaces/schedules"
import { IUserRequest } from "../../Interfaces/users"

let userId: string = ""
let professionnalId: string = ""
let tokenUser: string = ""

const schedulesData: IScheduleRequest = {
  day: "2022/10/06",
  hour: "12:30",
  description: "Fisioterapia para o joelho",
  serviceType: {
    name: "Fisioterapia",
    price: 255,
    duration: "60 minutos",
  },
  userId: userId,
  professionnalId: professionnalId,
}

const userData: IUserRequest = {
  name: "Teste Agendamento",
  email: "testschedules@kenzie.com",
  password: "123456",
  isAdm: true,
  address: {
    complement: "Casa",
    number: 5,
    zipCode: "23087470",
  },
}

const hospitalData: IHospitalRequest = {
  name: "São Judas",
  cnpj: "78.014.887/0001-64",
  address: {
    complement: "Prédio",
    zipCode: "23087470",
    number: 100,
  },
}

const profissionalData: IProfessionalRequest = {
  name: "Matheus",
  email: "matheus@kenzie.com",
  password: "123456",
  CRM: "CRM/RJ 123456",
  serviceType: {
    name: "Fisioterapeuta",
    price: 89,
    duration: "60 minutos",
  },
  cnpj: "78.014.887/0001-64",
}

let createdSchedules: any = []
let schedulesId: string = ""

describe("Testando rotas de agendamento", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((error) => error)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /schedules -> Deve ser capaz de criar um novo agendamento", async () => {
    const resultUser = await request(app).post("/user").send(userData)
    const resultLogin = await request(app)
      .post("/login/user")
      .send({ email: userData.email, password: userData.password })

    userId = resultUser.body.id
    tokenUser = resultLogin.body.token

    const resultHospital = await request(app)
      .post("/hospital")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(hospitalData)

    const result = await request(app)
      .post("/professional")
      .send(profissionalData)

    professionnalId = result.body.id

    const resultSchedules = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({ ...schedulesData, userId, professionnalId })

    schedulesId = resultSchedules.body.id
    // createdSchedules.push(resultSchedules.body.professional)

    expect(resultSchedules.status).toBe(201)
    expect(resultSchedules.body).toHaveProperty("id")
  })

  test("GET /schedules -> Deve ser capaz de listar todos os agendamentos", async () => {
    const result = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(result.status).toBe(200)
    expect(result.body[0]).toHaveProperty("id")
    expect(result.body[0]).toHaveProperty("day")
    expect(result.body[0]).toHaveProperty("hour")
    expect(result.body[0]).toHaveProperty("description")
  })

  test("GET /schedules/user/:id -> Deve ser capaz de listar todos os agendamentos de um usuário especifico", async () => {
    const result = await request(app)
      .get(`/schedules/user/${userId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(result.status).toBe(200)
  })

  test("GET /schedules/professional/:id -> Deve ser capaz de listar todos os agendamentos de um profissional especifico", async () => {
    const result = await request(app)
      .get(`/schedules/professional/${professionnalId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(result.status).toBe(200)
  })

  test("PATCH /schedules/:id -> Deve ser capaz de atualizar um agendameno", async () => {
    const result = await request(app)
      .get(`/schedules/professional/${professionnalId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(result.status).toBe(200)
  })

  test("DELETE /schedules/:id -> Deve ser capaz de deletar um agendamento", async () => {
    const result = await request(app)
      .delete(`/schedules/${schedulesId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(result.status).toBe(200)
    expect(result.body).toMatchObject({message: "Agendamento deletado com sucesso"})
  })
})
