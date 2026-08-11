import { makeCrudRoutes } from './factory.js'
import ClassModel from '../models/ClassModel.js'

const router = makeCrudRoutes(ClassModel, { publicGet: true })
export default router
