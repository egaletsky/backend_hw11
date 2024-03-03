import {Request, Response} from 'express'
import {db} from '../db/db'
import {OutputVideoType} from '../input-output-types/video-types'


export const deleteVideoController = (req: Request<{id:string}>, res: Response) => {

    const video = db.videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.status(404).send()
        return
    }

    db.videos = db.videos.filter(v => v.id !== +req.params.id)
    res.status(204).send()
}