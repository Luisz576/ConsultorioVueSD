import IHttpContext from "../../core/contracts/http/ihttp_context";
import doctorsRepository from "../repository/doctors_repository";

class DoctorsController{
  constructor(){}
  async store(context: IHttpContext){
    const { universityDegree, personData } = context.getRequest().body
    try{
      if(universityDegree && personData && personData.name && personData.cpf){
        await doctorsRepository.create(universityDegree, personData)
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
      const doctors = await doctorsRepository.getAll()
      return context.getResponse().json({
        doctors: doctors
      })
    }catch(e){
      console.error(e)
      return context.getResponse().sendStatus(500)
    }
    return context.getResponse().sendStatus(400)
  }
  async delete(context: IHttpContext){
    const { did } = context.getRequest().params
    try{
      if(did && !isNaN(Number(did)) && Number(did) > 0){
        await doctorsRepository.delete(Number(did))
        return context.getResponse().sendStatus(200)
      }
    }catch(e){
      console.error(e)
      return context.getResponse().sendStatus(500)
    }
    return context.getResponse().sendStatus(400)
  }
  async show(context: IHttpContext){
    const { did } = context.getRequest().params
    try{
      if(did && !isNaN(Number(did)) && Number(did) > 0){
        return context.getResponse().json({
          doctor: await doctorsRepository.get(Number(did))
        })
      }
    }catch(e){
      console.error(e)
      return context.getResponse().sendStatus(500)
    }
    return context.getResponse().sendStatus(400)
  }
}

const doctorsController = new DoctorsController()

export default doctorsController
