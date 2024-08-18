import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/galvatron/api/v1/",
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
});

axios.interceptors.response.use(
    (response) => {
        console.log('response', response)
        return response;
    },
    (error) => {
        const {response} = error;

        console.log("Got the error ", response?.errorMessage);


        return Promise.reject(response);
    }
)

export default api;