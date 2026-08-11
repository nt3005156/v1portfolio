import { makeCrudRoutes } from './factory.js'
import AdModel from '../models/AdModel.js'

export default makeCrudRoutes(AdModel, { publicGet: true })
