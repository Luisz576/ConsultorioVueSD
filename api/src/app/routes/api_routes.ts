import { Router } from 'express'
import ExpressAdapter from '../adapter/express_adapter'
import doctorsController from '../controller/doctors_controller'

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

routes.get('/clients', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})
routes.post('/client', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})
routes.delete('/client/:did', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})

routes.get('/doctor/:did/appointments', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})
routes.post('/doctor/:did/appointment', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})
routes.patch('/doctor/appointment/:aid', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})
routes.delete('doctor/appointment/:aid', (req, res, next) => {
  const adapter = new ExpressAdapter(req, res, next)
  return adapter.getResponse().json({
    // ! TODO
  })
})

export default routes
