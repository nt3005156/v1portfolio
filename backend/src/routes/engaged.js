import { makeCrudRoutes } from './factory.js'
import EngagedModel from '../models/EngagedModel.js'

export default makeCrudRoutes(EngagedModel, { publicGet: true })
