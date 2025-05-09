import { useQuery } from 'react-query'
import { useAppSelector } from '../shared/store'
import "./_commits.scss"
import { fetchCommits } from '../repositories/api'
import * as dayjs from 'dayjs'
import LoadingScreen from '../shared/components/Loading'
import { useParams } from 'react-router-dom'
interface IcommitProps{
    pullIndex:number
    onClick: (sha: string) => void
}

const Commits=({pullIndex,onClick}:IcommitProps)=>{
    const {repoid}=useParams()
    const { user } = useAppSelector((state) => state.auth)
    const userName = user?.user_metadata?.user_name
    const { data: commits, isLoading: commitsLoading } =useQuery({
        queryFn: () => fetchCommits(userName, repoid!,pullIndex),
        queryKey: ["commits", userName],
        enabled: !!userName, 
      })
    const commitList=commits?.data

    if(commitsLoading) return <LoadingScreen size="s" blur/>
    return(
        <div className='commit-container'>
        <div className='pull-request__commit__title'>Commits List:</div>
        {commitList?.map((commit:any) => (
                <div key={commit.id} className='commit-list'>
                    <div className='commit-item' onClick={() => onClick(commit.sha)}>
                        <img src={commit.committer.avatar_url} alt="user-avatar" />
                        <p className='ant-collapse-header-text commit-desc'>{commit.commit.message}</p>
                        <p className='ant-collapse-header-text commit-create'>Created At : {dayjs(commit.commit.committer.date).format("DD/MM/YYYY")}</p>
                    </div>
                </div>
                ))}
                
                </div>
    )
}
export default Commits