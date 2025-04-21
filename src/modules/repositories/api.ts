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

export async function fetchCommits(user_name: string, repo: string,ref:number) {
  try {
    const url=endpoints.getPullRequestsCommits.replace(':user',user_name,).replace(':repo',repo,).replace(':ref',ref.toString())
    const res = await axiosInstance.get(url,{timeout:50000});
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchPulls(user_name: string, repo: string) {
    try {
      const url =endpoints.getPullRequests.replace(':user',user_name).replace(':repo',repo)
      const res = await axiosInstance.get(url,{timeout:50000})
      return res
    } catch (error) {
      console.log(error);
    }
  }
