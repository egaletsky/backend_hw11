import {Request, Response} from 'express'
import {db} from '../db/db'
import {InputVideoType, OutputVideoType, Resolutions, UpdateVideoType} from '../input-output-types/video-types'
import {OutputErrorsType} from 'src/input-output-types/output-errors-type';


const inputValidation = (video: UpdateVideoType) => {
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

    if ( typeof video.canBeDownloaded !== 'boolean' ){
        errors.errorsMessages.push({
            message: 'bad author', field: 'canBeDownloaded'
        })
    }

    if ( typeof video.minAgeRestriction === 'number' && (video.minAgeRestriction < 1 || video.minAgeRestriction >18 )   ){
        errors.errorsMessages.push({
            message: 'minAgeRestriction', field: 'minAgeRestriction'
        })
    }

    if (!Array.isArray(video.availableResolutions)
        || video.availableResolutions.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'bad resolution', field: 'availableResolutions'
        })
    }

    if ( typeof video.publicationDate !== 'string'){
        errors.errorsMessages.push({
            message: 'bad publicationDate', field: 'publicationDate'
        })
    }
    else {
        const datePattern = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
        const checkISO = datePattern.test(video.publicationDate)

        if(!checkISO){
            errors.errorsMessages.push({
                message: 'bad publicationDate(2)', field: 'publicationDate'
            })
        }
    }
    //StringMatching /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

    return errors
}


export const updateVideoController = (req: Request<{ id: string }, any, UpdateVideoType>, res: Response<OutputVideoType | {}>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }

    const video = db.videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.status(404).json({})
        return
    }

    video.title = req.body.title;
    video.author = req.body.author;
    video.availableResolutions = req.body.availableResolutions;
    video.canBeDownloaded =req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate



    res.status(204).send()
}
