import { makeCrudRoutes } from './factory.js'
import SubjectModel from '../models/SubjectModel.js'

const router = makeCrudRoutes(SubjectModel, { publicGet: true, publicGetAll: true })
export default router
