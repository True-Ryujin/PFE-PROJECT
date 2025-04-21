import { useQuery } from "react-query"
import {fetchRepos} from "./api"
import CardSkew from "../shared/components/Cards/Cards-SKEW/Card-skew"
import Empty from "../shared/components/NoData/index"
import Main from "../shared/layout/MainContainer/MainContainer"
import LoadingScreen from "../shared/components/Loading"
import './__repositories.scss'
import { useNavigate } from "react-router-dom"
import { PATH } from "../shared/routes/paths"






const RepoPage = () => {
  const navigate=useNavigate()
  const {data,isLoading}=useQuery({
    queryFn:fetchRepos,
    queryKey:["repos",{}]
  })
  
  const repos=data?.data
  const noData =!isLoading && !repos?.length
  if(isLoading) return <LoadingScreen size="full" blur/>
   return (
    
   <div>
     <Main  linkProps={{links:[{href:"Repositories",name:"Repositories"}],title:"Repositories"}}>
     {noData ? (<Empty title={"No Projects"}/>):(
         <div className="repositories-container">
         {
           repos?.map((repo:any,index:number)=>{
             return <CardSkew autoColors={index+1} key={repo.id || index} onClick={()=>navigate(PATH.PULLREQUEST.replace(":repoid",repo.name))}>
               <div className="repositories-container__card__visibility">
                 {repo.private?<p>Private</p>:<p>Public</p>}
               </div>
               <p className="cardskew-title">{repo.name}</p>
             </CardSkew>
           })
         }
         </div>
          
       )}
     </Main>
    </div>
    
   )
}

export default RepoPage
