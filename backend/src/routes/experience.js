import { makeCrudRoutes } from './factory.js'
import ExperienceModel from '../models/ExperienceModel.js'

export default makeCrudRoutes(ExperienceModel, { publicGet: true })
