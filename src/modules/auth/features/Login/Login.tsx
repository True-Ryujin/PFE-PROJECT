import { supabase } from '@src/modules/shared/utils/supabase';
import Card from '../../../../modules/shared/components/Cards/Card-BALANCE/Card-balance'
import img from '../../../shared/assets/images/github_logo.png'
import { PATH } from '@src/modules/shared/routes/paths';


const Login = () => {
  async function signInWithAuth() {
    await supabase.auth.signInWithOAuth({
      provider:'github',
      options: {
        redirectTo: `${window.location.origin}${PATH.LOGIN}`,
      },
    })
    await supabase.auth.getSession()
  }

  return (
    <div className="login-module">
      <div className="login-card-container">
      <Card className="login-module__card">
        
        <p className="login-module__card__title">Welcome</p>
        <p className='text'>Login via your Github account to get started with our app</p>
        
        
        <button className="github-btn" type="button" onClick={signInWithAuth}>
          <i className="github-icon"><img src={img} alt="Github login" /></i> 
          Sign in with Github
        </button>
      </Card>
      </div>
    </div>
  )
}

export default Login
