import {Request, Response} from 'express'
import {db} from '../db/db'
import {InputVideoType, OutputVideoType, Resolutions} from '../input-output-types/video-types';
import {OutputErrorsType} from '../input-output-types/output-errors-type';
import {VideoDBType} from '../db/video-db-type';


const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if ( typeof video.title !== 'string' ){
        errors.errorsMessages.push({
            message: 'bad title', field: 'title'
        })
    }

    if ( typeof video.title === 'string' && video.title.length > 40 ){
        errors.errorsMessages.push({
            message: 'bad title', field: 'title'
        })
    }

    if ( typeof video.author !== 'string' ){
        errors.errorsMessages.push({
            message: 'bad author', field: 'author'
        })
    }

    if ( typeof video.author === 'string'  && video.author.length > 20 ){
        errors.errorsMessages.push({
            message: 'bad author', field: 'author'
        })
    }

    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'bad resolution', field: 'availableResolutions'
        })
    }


    return errors
}


export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }


    const createMs = Date.now()

    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded:false,
        minAgeRestriction: null,
        createdAt: new Date(createMs).toISOString(),
        publicationDate: new Date(createMs + 1000*24*60*60).toISOString()
    }

    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .json(newVideo)
}