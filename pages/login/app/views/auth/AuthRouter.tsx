// import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './login/Login';
import Link from 'next/link'


export default function AuthRouter(){
   return (
    //   <Switch>
    //      <Route exact path="/auth/login">
    //         <Login />
    //      </Route>
    <Link href='/auth/login'>
    <Login/>
    </Link>
    //      <Redirect to="/auth/login" />
    //   </Switch>
   );
}