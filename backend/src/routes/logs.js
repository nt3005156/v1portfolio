import { makeCrudRoutes } from './factory.js'
import DailyLogModel from '../models/DailyLogModel.js'

export default makeCrudRoutes(DailyLogModel, { publicGet: true })
