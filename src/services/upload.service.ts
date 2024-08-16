import api from "./api";


const uploadImages = async (payload: {files: any}) => {
    return api.post("/upload", payload);
}

export const uploadService = {
    uploadImages
}