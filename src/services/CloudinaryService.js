const cloudName = 'djx2edbwi'
const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

import axios from "axios"

class CloudinaryService{
    async upload(image){
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'vAssistant')

        const res = await axios.post(uploadUrl, formData)
        return res.data.secure_url;
    }
}

export default new CloudinaryService;