import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../repositories/routes/routes'
import pullRoutes from '../../pullrequests/routes/routes'
import changeRoutes from '../../filechanges/routes/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...repoRoutes,
  ...pullRoutes,
  ...changeRoutes
]

export default routes
