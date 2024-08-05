import { IPersonRequiredAndPartial } from "../../core/model/iperson"
import prisma from "../services/prisma"

class DoctorsRepository{
  async getAll(){
    const doctors: any = await prisma.doctor.findMany()
    for(let d in doctors){
      const person = await prisma.person.findFirst({
        where: {
          id: doctors[d].personId
        }
      })
      doctors[d].person = person
    }
    return doctors
  }
  async get(doctorId: number){
    const doctor: any = await prisma.doctor.findFirst({
      where: {
        id: doctorId
      }
    })
    doctor.person = await prisma.person.findFirst({
      where: {
        id: doctor.personId
      }
    })
    return doctor
  }
  async create(universityDegree: string, personData: IPersonRequiredAndPartial){
    const person = await prisma.person.create({
      data: {
        cpf: personData.cpf,
        name: personData.name,
        cellPhone: personData.cellPhone,
        email: personData.email,
      }
    })
    return await prisma.doctor.create({
      data: {
        universityDegree: universityDegree,
        personId: person.id
      }
    })
  }
  async delete(doctorId: number){
    const doctor = await prisma.doctor.delete({
      where: {
        id: doctorId
      }
    })
    await prisma.person.delete({
      where: {
        id: doctor.personId
      }
    })
  }
}

const doctorsRepository = new DoctorsRepository()

export default doctorsRepository
