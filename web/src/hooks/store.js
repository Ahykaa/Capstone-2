import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from '@/hooks/api/authApi'
import { userApi } from '@/hooks/api/userApi'
import authSlice from '@/hooks/redux/authSlice'

import { dashboardApi } from './api/dashboardApi'
import { orderApi } from './api/orderApi'
import { departmentApi } from './api/departmentApi'
import { unitApi } from './api/unitApi'
import { statusApi } from './api/statusApi'
import { requestforApi } from './api/requestforApi'
import { reservationApi } from './api/reservationApi'
import { orderEntriesApi } from './api/orderEntriesApi'

export const store = configureStore({
  reducer: {
    authState: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [statusApi.reducerPath]: statusApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [requestforApi.reducerPath]: requestforApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [orderEntriesApi.reducerPath]: orderEntriesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      departmentApi.middleware,
      unitApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      statusApi.middleware,
      dashboardApi.middleware,
      requestforApi.middleware,
      reservationApi.middleware,
      orderEntriesApi.middleware,
    ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
