import prisma from "../services/prisma"

class AppointmentsRepository{
  async delete(doctorId: number, patientId: number, hour: number) {
    return await prisma.appointment.deleteMany({
      where: {
        doctorId: doctorId,
        patientId: patientId,
        hour: hour
      }
    })
  }
  async create(props: { doctorId: number; patientId: number; hour: number; duration: number }) {
    return await prisma.appointment.create({
      data: props
    })
  }
  async getAll(doctorId: number){
    return await prisma.appointment.findMany({
      where: {
        doctorId: doctorId
      }
    })
  }
}

const appointmentsRepository = new AppointmentsRepository()

export default appointmentsRepository
