import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import {setDB} from '../src/db/db';
import {dataset1} from './datasets';
import {InputVideoType, Resolutions} from '../src/input-output-types/video-types';

describe('/videos', () => {
    beforeAll(async () => {
        //await req.delete('/testing/all-data')
    })

    it('should get empty array', async () => {
        setDB()

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

        expect(res.body.length).toBe(0)
    })
    it('should get not empty array', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)


        console.log(res.body)

        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    it('should create', async () => {
        setDB()
        const newVideo: any/*InputVideoType*/ = {
            title: 't1',
            author: 'a1',
            availableResolutions: ['P144']
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)

        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)

    })
    it('shouldn\'t create - bad Resolution', async () => {
        setDB()
        const newVideo: any = {
            title: 't1',
            author: 'a1',
            availableResolution: 'wwww'
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(400)
         expect(res.body.availableResolution).not.toEqual(newVideo.availableResolution)

    })
    it('shouldn\'t find', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)

    })

    it('shouldn\'t delete', async () => {
        setDB(dataset1)

        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)

    })

    it('should delete', async () => {
        setDB(dataset1)

        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/666')
            .expect(404)

    })

})