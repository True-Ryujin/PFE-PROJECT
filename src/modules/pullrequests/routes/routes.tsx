/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper/index'
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import { PATH } from '@src/modules/shared/routes/paths'
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'


type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.PULLREQUEST,
    component: lazy(() => import('../index')),
    layout:MainLayout
  },
]

export default routes
