
import {Router} from 'express';
import {deleteTestingAllData} from './deleteTestingAllData';

export const testingRouter = Router()
testingRouter.delete('/', deleteTestingAllData)

