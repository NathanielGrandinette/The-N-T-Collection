import axios from "axios"

const verifyToken = () => {
    const token = JSON.parse(localStorage.getItem('Token'))
    return token ? token : ''
}

const instance = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'x-access-token': verifyToken(),
        "Content-Type": "application/json",
    }
})

export default instance