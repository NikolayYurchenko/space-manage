import cors from 'cors'

export default function (app) {
    
   const publicOptions = { 
        origin: (origin, cb) => {
            cb(null, true)
        },
        methods: "GET"
    }

    app.use('/public', cors(publicOptions))
}