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
export async function fetchFileChanges(owner_name:string,repo:string,sha:string){
  try {
    const url =endpoints.getOneFileChanges.replace(':owner',owner_name).replace(':repo',repo).replace(':sha',sha)
    const res = await axiosInstance.get(url)
    
    const diff = await axiosInstance.get(url,{headers : {Accept: 'application/vnd.github.v3.diff; charset=utf-8'}})
    
    return {
      files:res.data.files,
      diffString:diff.data
    }
  } catch (error) {
    console.log(error)
  }
}



export async function fetchFileContent(owner_name:string,repo:string,path:string,ref:string){
  try {
    const url =endpoints.getOneFileContent.replace(':user',owner_name).replace(':repo',repo).replace(':path',path).replace(':ref',ref)
    console.log(url)
    const res = await axiosInstance.get(url,{timeout:50000})
    return res
  } catch (error) {
    console.log(error)
  }
}




