import { makeCrudRoutes } from './factory.js'
import ProjectModel from '../models/ProjectModel.js'

export default makeCrudRoutes(ProjectModel, { publicGet: true })
