import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../repositories/routes/routes'
import pullRoutes from '../../pullrequests/routes/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...repoRoutes,
  ...pullRoutes
]

export default routes
