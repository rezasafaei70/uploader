import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import companion from '@uppy/companion'
import { v4 as uuid } from 'uuid';

import {storageConfig,config} from './config/config.js'

const app = express()


app.use(bodyParser.json())
app.use(session({ secret: '223423asdfasd' }))



const options = {
  s3: {
    getKey: (req, filename, metadata) => {
      let extension = (filename) ? filename.split('.').pop() : null;
      extension = extension && extension.length === 3 ? extension : null;
      const prefix = uuid();
      const s3filname = extension ? 'media/'+prefix + '.' + extension : prefix;
      return s3filname;
  },
    key: storageConfig.accessKeyId,
    secret: storageConfig.secretAccessKey,
    bucket: storageConfig.bucket,
    endpoint:storageConfig.endpoint,
    expires: 3600, // default: 300 (5 minutes)
    acl: 'public-read', // default: none
  },
  server: {
    host: 'localhost:3020',
    protocol: 'http',
    // This MUST match the path you specify in `app.use()` below:
    path: '/companion',
  },
   secret: 'Cplh4ISm9QGTW739qw9m3w==',
  filePath: 'folder/',
}

const { app: companionApp } = companion.app(options)
app.use((req, res, next) => {
  console.log(config.origin)
  if(req.get('origin')==config.origin){
    next()
  }else{
    next()
  }
 
})
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/companion', companionApp)
const server = app.listen(5000)

companion.socket(server)