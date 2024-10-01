import React from 'react'
import EtapasRoutes from './EtapasRoutes'
import DashboardRoutes from './DashboardRoutes'
import { Route } from 'react-router-dom'
import { PRIVATE, LOGOUT } from '../config/routes/paths'
import Private from '../views/Private'
import Logout from '../views/Logout'
import PrivateRoutes from '../components/router/PrivateRoutes'

const PrivateRoutesComponent = () => {
  return (
    
    <>
      <Route path={PRIVATE} element={<PrivateRoutes />}>
        <Route path={PRIVATE} element={<Private/>}>
          <DashboardRoutes /> {/* Inserta las rutas principales */}
          <EtapasRoutes/>
        </Route>
        <Route path={LOGOUT} element={<Logout/>} />
      </Route>
    </>
  )
}

export default PrivateRoutesComponent
