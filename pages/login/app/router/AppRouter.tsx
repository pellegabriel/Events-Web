import { useContext } from 'react';
import { AuthRouter } from '../views/auth/AuthRouter';
import { DashboardRouter } from '../views/dashboard/DashboardRouter';
import { AuthContext } from '../views/store/contexts/AuthContext';
import { PrivateRouter } from './PrivateRouter';
import Link from 'next/link'
interface Context {
   dispatchUser?:any,
   user?:User
}

interface User{
   loggedIn:boolean
}


export function AppRouter(){

   const { user }:Context = useContext(AuthContext);

   return (
 <>
            <Link href='/auth' >
            <AuthRouter/>
            </Link>
            {/* <Link href='/auth' component={AuthRouter} /> */}
            <PrivateRouter
              loggedIn={user?.loggedIn}
              component={DashboardRouter}
            />

            <Link href='/dashboard/home' />   
    </>
   )
}