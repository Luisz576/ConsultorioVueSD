import IHttpContext from "../../core/contracts/http/ihttp_context";
import appointmentsRepository from "../repository/appointments_repository";

class AppointmentsController{
  async delete(context: IHttpContext) {
    const { did, pid } = context.getRequest().params
    const doctorId = Number(did)
    const patientId = Number(pid)
    if(!isNaN(doctorId) && !isNaN(patientId)){
      try{
        return context.getResponse().json({
          appointment: await appointmentsRepository.delete(doctorId, patientId) // ! TODO
        })
      }catch(e){
        console.error(e)
        return context.getResponse().sendStatus(500)
      }
    }
    return context.getResponse().sendStatus(400)
  }
  async store(context: IHttpContext){
    const { did } = context.getRequest().params
    const { patientId, hour, duration } = context.getRequest().body
    const doctorId = Number(did)
    if(!isNaN(doctorId) && !isNaN(Number(patientId)) && !isNaN(Number(hour)) && !isNaN(Number(duration))){
      try{
        return context.getResponse().json({
          appointment: await appointmentsRepository.create({
            doctorId: doctorId,
            patientId: Number(patientId),
            hour: Number(hour),
            duration: Number(duration)
          })
        })
      }catch(e){
        console.error(e)
        return context.getResponse().sendStatus(500)
      }
    }
    return context.getResponse().sendStatus(400)
  }
  async index(context: IHttpContext){
    const { did } = context.getRequest().params
    const doctorId = Number(did)
    if(!isNaN(doctorId)){
      try{
        return context.getResponse().json({
          appointments: await appointmentsRepository.getAll(doctorId)
        })
      }catch(e){
        console.error(e)
        return context.getResponse().sendStatus(500)
      }
    }
    return context.getResponse().sendStatus(400)
  }
}

const appointmentsController = new AppointmentsController()

export default appointmentsController
