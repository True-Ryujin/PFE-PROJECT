import axiosInstance from "../auth/utils/axios"
import { endpoints } from "../shared/store/routes/endpoints.routes"

export async function fetchRepos() {
    try {
        const res=await axiosInstance.get(endpoints.getRepositories)
        return res
    } catch (error) {
        console.log(error)
    }
  }
