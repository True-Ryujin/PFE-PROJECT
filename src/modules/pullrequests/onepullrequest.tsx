import verify from '../shared/assets/images/verifie.png'
import Merge from "../shared/assets/icons/merge"
import "./_onepullrequest.scss"
import {useAppSelector } from '../shared/store'  


const OnePullRequest: React.FC<any> = ({ pulls })=>{
    
      const { user } = useAppSelector((state) => state.auth)
      const { avatar_url} = user?.user_metadata || {}
    return(
        <div className='pull-container'>
            <div className='left-section'>
                <div className='merge-icon'>
                    <p className='ant-collapse-header-text'>Merge branch octa into hotfixs<Merge/></p>
                    
                </div>
                <p className='ant-collapse-header-text create'>Created at : {pulls.created_at}</p>
            </div>
            <div className='right-section'>
                <div className='section'>
                    <img className='user-avatar' src={avatar_url} alt="user-avatar" />
                    <span>{pulls.state}</span>
                    <img className='verify' src={verify} alt="verify" />
                </div>
                <p className='ant-collapse-header-text update'>Updated at : {pulls.updated_at}</p>
            </div>
            
        </div>
    )
}
export default OnePullRequest