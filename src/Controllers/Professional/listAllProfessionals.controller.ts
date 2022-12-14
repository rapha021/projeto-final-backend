import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import listAllProfessionalsService from "../../Services/professional/listAllProfessionals.service"

const listAllProfessionalsController = async (req: Request, res: Response) => {
  const list = await listAllProfessionalsService()

  return res.json(instanceToPlain(list))
}

export default listAllProfessionalsController
