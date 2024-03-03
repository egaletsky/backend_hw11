import {Router} from 'express'
import {getVideoController} from './getVideosController';
import {createVideoController} from './createVideoController';
import {findVideoController} from './findVideoController'
import {deleteVideoController} from './deleteVideoController'
import {updateVideoController} from './updateVideoController';

export const videosRouter = Router()

videosRouter.get('/', getVideoController)
videosRouter.post('/', createVideoController)
videosRouter.delete('/:id', deleteVideoController)

videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', updateVideoController)

//--videosRouter.post('/', createVideoController)
//--videosRouter.delete('/:id', deleteVideoController)
// ...

