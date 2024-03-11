import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://api.weatherbit.io/v2.0',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClient