import { makeCrudRoutes } from './factory.js'
import ChapterModel from '../models/ChapterModel.js'

const router = makeCrudRoutes(ChapterModel, { publicGet: true, publicGetAll: true })
export default router
