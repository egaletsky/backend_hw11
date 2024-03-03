import {app} from './app'
import {SETTINGS} from './settings'
import * as process from 'process';


console.log(process.env.PORT)

app.listen(SETTINGS.PORT, () => {
    console.log('...server started')
})