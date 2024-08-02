/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/_dashboard'
import { Route as AuthImport } from './routes/_auth'

// Create Virtual Routes

const DashboardIndexLazyImport = createFileRoute('/_dashboard/')()
const DashboardAboutLazyImport = createFileRoute('/_dashboard/about')()
const DashboardTasksIndexLazyImport = createFileRoute('/_dashboard/tasks/')()
const DashboardHabitsIndexLazyImport = createFileRoute('/_dashboard/habits/')()
const DashboardCalendarIndexLazyImport = createFileRoute(
  '/_dashboard/calendar/',
)()
const DashboardUserProfileLazyImport = createFileRoute(
  '/_dashboard/user/profile',
)()
const DashboardAdminSchedulerIndexLazyImport = createFileRoute(
  '/_dashboard/admin/scheduler/',
)()
const AuthAuthRegisterIndexLazyImport = createFileRoute(
  '/_auth/auth/register/',
)()
const AuthAuthLoginIndexLazyImport = createFileRoute('/_auth/auth/login/')()
const DashboardAdminSchedulerTasksLazyImport = createFileRoute(
  '/_dashboard/admin/scheduler/tasks',
)()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexLazyRoute = DashboardIndexLazyImport.update({
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/index.lazy').then((d) => d.Route),
)

const DashboardAboutLazyRoute = DashboardAboutLazyImport.update({
  path: '/about',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/about.lazy').then((d) => d.Route),
)

const DashboardTasksIndexLazyRoute = DashboardTasksIndexLazyImport.update({
  path: '/tasks/',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/tasks/index.lazy').then((d) => d.Route),
)

const DashboardHabitsIndexLazyRoute = DashboardHabitsIndexLazyImport.update({
  path: '/habits/',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/habits/index.lazy').then((d) => d.Route),
)

const DashboardCalendarIndexLazyRoute = DashboardCalendarIndexLazyImport.update(
  {
    path: '/calendar/',
    getParentRoute: () => DashboardRoute,
  } as any,
).lazy(() =>
  import('./routes/_dashboard/calendar/index.lazy').then((d) => d.Route),
)

const DashboardUserProfileLazyRoute = DashboardUserProfileLazyImport.update({
  path: '/user/profile',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/user/profile.lazy').then((d) => d.Route),
)

const DashboardAdminSchedulerIndexLazyRoute =
  DashboardAdminSchedulerIndexLazyImport.update({
    path: '/admin/scheduler/',
    getParentRoute: () => DashboardRoute,
  } as any).lazy(() =>
    import('./routes/_dashboard/admin/scheduler/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthAuthRegisterIndexLazyRoute = AuthAuthRegisterIndexLazyImport.update({
  path: '/auth/register/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/register/index.lazy').then((d) => d.Route),
)

const AuthAuthLoginIndexLazyRoute = AuthAuthLoginIndexLazyImport.update({
  path: '/auth/login/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/login/index.lazy').then((d) => d.Route),
)

const DashboardAdminSchedulerTasksLazyRoute =
  DashboardAdminSchedulerTasksLazyImport.update({
    path: '/admin/scheduler/tasks',
    getParentRoute: () => DashboardRoute,
  } as any).lazy(() =>
    import('./routes/_dashboard/admin/scheduler/tasks.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard/about': {
      preLoaderRoute: typeof DashboardAboutLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/': {
      preLoaderRoute: typeof DashboardIndexLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/user/profile': {
      preLoaderRoute: typeof DashboardUserProfileLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/calendar/': {
      preLoaderRoute: typeof DashboardCalendarIndexLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/habits/': {
      preLoaderRoute: typeof DashboardHabitsIndexLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/tasks/': {
      preLoaderRoute: typeof DashboardTasksIndexLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/admin/scheduler/tasks': {
      preLoaderRoute: typeof DashboardAdminSchedulerTasksLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_auth/auth/login/': {
      preLoaderRoute: typeof AuthAuthLoginIndexLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/auth/register/': {
      preLoaderRoute: typeof AuthAuthRegisterIndexLazyImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard/admin/scheduler/': {
      preLoaderRoute: typeof DashboardAdminSchedulerIndexLazyImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([
    AuthAuthLoginIndexLazyRoute,
    AuthAuthRegisterIndexLazyRoute,
  ]),
  DashboardRoute.addChildren([
    DashboardAboutLazyRoute,
    DashboardIndexLazyRoute,
    DashboardUserProfileLazyRoute,
    DashboardCalendarIndexLazyRoute,
    DashboardHabitsIndexLazyRoute,
    DashboardTasksIndexLazyRoute,
    DashboardAdminSchedulerTasksLazyRoute,
    DashboardAdminSchedulerIndexLazyRoute,
  ]),
])

/* prettier-ignore-end */
