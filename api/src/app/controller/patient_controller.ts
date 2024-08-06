import IHttpContext from "../../core/contracts/http/ihttp_context";
import patientsRepository from "../repository/patients_repository";

class PatientsController{
  async store(context: IHttpContext){
    const { personData } = context.getRequest().body
    try{
      if(personData && personData.name && personData.cpf){
        await patientsRepository.create(personData)
        return context.getResponse().sendStatus(200)
      }
    }catch(e){
      console.error(e);
      return context.getResponse().sendStatus(501)
    }
    return context.getResponse().sendStatus(400)
  }
  async index(context: IHttpContext){
    try{
      const patients = await patientsRepository.getAll()
      return context.getResponse().json({
        patients: patients
      })
    }catch(e){
      console.error(e)
      return context.getResponse().sendStatus(500)
    }
    return context.getResponse().sendStatus(400)
  }
  async delete(context: IHttpContext){
    const { pid } = context.getRequest().params
    try{
      if(pid && !isNaN(Number(pid)) && Number(pid) > 0){
        await patientsRepository.delete(Number(pid))
        return context.getResponse().sendStatus(200)
      }
    }catch(e){
      console.error(e)
      return context.getResponse().sendStatus(500)
    }
    return context.getResponse().sendStatus(400)
  }
  async show(context: IHttpContext){
    const { pid } = context.getRequest().params
    try{
      if(pid && !isNaN(Number(pid)) && Number(pid) > 0){
        return context.getResponse().json({
          doctor: await patientsRepository.get(Number(pid))
        })
      }
    }catch(e){
      console.error(e)
      return context.getResponse().sendStatus(500)
    }
    return context.getResponse().sendStatus(400)
  }
}

const patientsController = new PatientsController()

export default patientsController
