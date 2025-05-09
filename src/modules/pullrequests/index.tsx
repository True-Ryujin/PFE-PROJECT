import { Collapse} from 'antd'
import React from 'react'
import { fetchPulls } from '../repositories/api'
import { useQuery } from 'react-query'
import Commits from './commits'
import OnePullRequest from './onepullrequest'
import { useAppSelector } from '../shared/store'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { useParams } from 'react-router-dom'
import { PATH } from '../shared/routes/paths'
import LoadingScreen from '../shared/components/Loading'
import Empty from "../shared/components/NoData/index"
import { useNavigate } from "react-router-dom"

export interface IPullRequest{
  id:number,
  number:number
  created_at:string,
  updated_at:string,
  state:string,
  node_id:string,
}
const PullRequest = () => {
  const navigate=useNavigate()
  const {repoid}=useParams()
  const { user } = useAppSelector((state) => state.auth)
  const userName = user?.user_metadata?.user_name

  

  const { data: pulls, isLoading: pullsLoading } =useQuery({
      queryFn: () => fetchPulls(userName, repoid!),
      queryKey: ["pulls", userName],
      enabled: !!userName && !!repoid, 
    })
  const pullRequests=pulls?.data
  const noData =!pullsLoading && !pullRequests?.length
  if(pullsLoading) return <LoadingScreen size="m" blur/>
  return (
    <MainContainer  linkProps={{links:[{href:PATH.REPOSITORIES,name:"Repositories"},{href:"",name:repoid!}],title:repoid!}}>
      <div className="custom-collapse">
  {noData ? (
    <Empty title={"No Pullrequests"} />
  ) : (
    <Collapse
      items={pullRequests?.map((pull: IPullRequest) => ({
        key: `${pull.id}`,
        label: <OnePullRequest pulls={pull} />,
        children: <Commits pullIndex={pull.number} onClick={(sha) => navigate(PATH.FILECHANGES.replace(":repoid", repoid!).replace(":nodeid", pull.node_id),{state: {commitSha: sha}})}/>
      }))}
    />
  )}
</div>

    
  </MainContainer>
    
  )
}
export default PullRequest