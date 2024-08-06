import { IPersonRequiredAndPartial } from "../../core/model/iperson"
import prisma from "../services/prisma"

class PatientsRepository{
  async getAll(){
    const patients: any = await prisma.patient.findMany()
    for(let d in patients){
      const person = await prisma.person.findFirst({
        where: {
          id: patients[d].personId
        }
      })
      patients[d].person = person
    }
    return patients
  }
  async get(patientId: number){
    const patient: any = await prisma.patient.findFirst({
      where: {
        id: patientId
      }
    })
    patient.person = await prisma.person.findFirst({
      where: {
        id: patient.personId
      }
    })
    return patient
  }
  async create(personData: IPersonRequiredAndPartial){
    const person = await prisma.person.create({
      data: {
        cpf: personData.cpf,
        name: personData.name,
        cellPhone: personData.cellPhone,
        email: personData.email,
      }
    })
    return await prisma.patient.create({
      data: {
        personId: person.id
      }
    })
  }
  async delete(patientId: number){
    await prisma.appointment.deleteMany({
      where: {
        patientId: patientId
      }
    })
    const patient = await prisma.patient.delete({
      where: {
        id: patientId
      }
    })
    await prisma.person.delete({
      where: {
        id: patient.personId
      },
    })
  }
}

const patientsRepository = new PatientsRepository()

export default patientsRepository
