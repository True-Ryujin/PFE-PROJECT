import Card from '../../../../modules/shared/components/Cards/Card-BALANCE/Card-balance'
import img from '../../../shared/assets/images/github_logo.png'
type Tauth = {
  signInWithGithub: () => void;
};
const Login = ({signInWithGithub}:Tauth) => {
  //async function signInWithGithub() {
  //  console.log('hello ')
  //}

  return (
    <div className="login-module">
      <div className="login-card-container">
      <Card className="login-module__card">
        
        <p className="login-module__card__title">Welcome</p>
        <p className='text'>Login via your Github account to get started with our app</p>
        
        
        <button className="github-btn" type="button" onClick={signInWithGithub}>
          <i className="github-icon"><img src={img} alt="Github login" /></i> 
          Sign in with Github
        </button>
      </Card>
      </div>
    </div>
  )
}

export default Login
