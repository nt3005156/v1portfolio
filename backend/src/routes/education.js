import { makeCrudRoutes } from './factory.js'
import EducationModel from '../models/EducationModel.js'

export default makeCrudRoutes(EducationModel, { publicGet: true })
