import { Router } from 'express'
import ExpressAdapter from '../adapter/express_adapter'
import doctorsController from '../controller/doctors_controller'
import patientsController from '../controller/patient_controller'
import appointmentsController from '../controller/appointments_controller'

const routes = Router()

routes.get('/doctors', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return doctorsController.index(adapter)
})
routes.get('/doctor/:did', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return doctorsController.show(adapter)
})
routes.post('/doctor', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return doctorsController.store(adapter)
})
routes.delete('/doctor/:did', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return doctorsController.delete(adapter)
})

routes.get('/patients', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return patientsController.index(adapter)
})
routes.post('/patient', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return patientsController.store(adapter)
})
routes.get('/patient/:pid', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return patientsController.show(adapter)
})
routes.delete('/patient/:pid', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return patientsController.delete(adapter)
})

routes.get('/doctor/:did/appointments', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return appointmentsController.index(adapter)
})
routes.post('/doctor/:did/appointment', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return appointmentsController.store(adapter)
})
routes.delete('/doctor/:did/appointment/:pid/:hour', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return appointmentsController.delete(adapter)
})

export default routes
