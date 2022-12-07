import axios from 'axios'

class UploadService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/upload`
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }

}

const uploadServices = new UploadService()

export default uploadServices