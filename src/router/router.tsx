import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import {ProtectedAdminRoute} from "../components/ProtectedAdminRoute";
import ProfSysListPage from "../pages/settingsPages/ProfSysListPage";
import Calculator from "../pages/Calculator";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { simpleListAction, simpleListLoader } from "./service.router";
import FullFeaturedCrudGrid from "../pages/TestGrid";
import { request } from "http";
import FurnSysListPage from "../pages/settingsPages/FurnSysListPage";
import GlassListPage from "../pages/settingsPages/GlassListPage";
import UserListPage, { userListAction, userListLoader } from "../pages/settingsPages/UserListPage";
// import FullFeaturedCrudGrid from "../pages/Test";
// import AdminPanel from "../pages/AdminPanel";
// import FurnSysList, {furnSysListAction, furnSysListLoader} from "../pages/adminPanelPages/FurnSysList";
// import GlassList, {glassListAction, glassListLoader} from "../pages/adminPanelPages/GlassList";
import WinTypeList, {winTypeListAction, winTypeListLoader} from "../pages/settingsPages/WinTypeListPage";
import PriceListPage, { priceListAction, priceListLoader } from "../pages/settingsPages/PriceListPage";
// import UserList, {userListAction, userListLoader} from "../pages/adminPanelPages/UserList";
// import PriceList, {priceListLoader} from "../pages/adminPanelPages/PriceList";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'calculator',
        element: (
          <ProtectedRoute>
            <Calculator />
          </ProtectedRoute>
        ) ,
      },
      {
        path: 'settings',
        action: async ({request}) => simpleListAction({request}, 'proflist'),
        loader: async () => simpleListLoader('proflist'),
        element: (
          <ProtectedAdminRoute>
            <ProfSysListPage />
          </ProtectedAdminRoute>
        ) ,
      },
      {
        path: 'userlist',
        action: userListAction,
        loader: userListLoader,
        element: (
          <ProtectedRoute>
            <UserListPage />
          </ProtectedRoute>
        ) ,
      },
      {
        path: 'profsyslist',
        action: async ({request}) => simpleListAction({request}, 'proflist'),
        loader: async () => simpleListLoader('proflist'),
        element: (
          <ProtectedAdminRoute>
            <ProfSysListPage />
          </ProtectedAdminRoute>
        ) ,
      },
      {
        path: 'furnsyslist',
        action: async ({request}) => simpleListAction({request}, 'furnlist'),
        loader: async () => simpleListLoader('furnlist'),
        element: (
          <ProtectedRoute>
            <FurnSysListPage />
          </ProtectedRoute>
        ) ,
      },
      {
        path: 'glasslist',
        action: async ({request}) => simpleListAction({request}, 'glasslist'),
        loader: async () => simpleListLoader('glasslist'),
        element: (
          <ProtectedRoute>
            <GlassListPage />
          </ProtectedRoute>
        ) ,
      },
      {
        path: 'wintypelist',
        action: winTypeListAction,
        loader: winTypeListLoader,
        element: (
          <ProtectedRoute>
            <WinTypeList />
          </ProtectedRoute>

        ) ,
      },
      {
        path: 'pricelist',
        action: priceListAction,
        loader: priceListLoader,
        element: (
          <ProtectedRoute>
            <PriceListPage />
          </ProtectedRoute>

        ) ,
      },

      {
        path: 'xxx',
        element: (
          <FullFeaturedCrudGrid />
        )
      },
    ]
  }
])
