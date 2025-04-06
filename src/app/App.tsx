import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppSelector } from '@src/modules/shared/store'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from '../modules/auth/features/Login/Login'
import Wrapper from '../modules/shared/layout/UniverseWrapper/index.tsx'
import { useState,useEffect } from 'react'
import { supabase } from "./client";
import BlankPage from './test'
import { User } from "@supabase/supabase-js";
import { use } from 'i18next'

const App = () => {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()
  const theme = useAppSelector((state) => state.theme.mode)
  const [user,setUser]=useState<User | null>(null)
  
  useEffect(() => {
    checkUser()
    const handleHashChange = () => checkUser()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  
  async function checkUser() {
    const { data, error } = await supabase.auth.getUser()
    console.log("User data from Supabase:", data)
    setUser(data.user)
    
  }
  async function signInWithAuth() {
    await supabase.auth.signOut()
    await supabase.auth.signInWithOAuth({
      provider:'github',
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    })
  }
  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <Wrapper>
        <Routes>
          <Route path="/" element={<Login signInWithGithub={signInWithAuth} />} />
          <Route path="/home" element={<BlankPage />} />
        </Routes>
    <div id={theme}>
      <Helmet>
        <title>Welcome - Github code reviewer</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>{renderRoutes(routes)}</QueryClientProvider>
    </div>
    </Wrapper>
  )
}

export default App
