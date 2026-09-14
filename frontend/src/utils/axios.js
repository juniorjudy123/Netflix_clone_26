import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
})

export default axiosInstance



axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")


    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})


axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {

        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true

            const refreshToken = localStorage.getItem("refreshToken")

            try {

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    {
                        refresh: refreshToken,
                    }
                )

                const newAccessToken = response.data.access

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                )

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`

                return axiosInstance(originalRequest)

            } catch (refreshError) {

                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)