import Link from 'next/link';
import { Login } from './auth/login/Login';


export default function AuthRouter(){
   return (
    <>
         <Link href="/auth/login">
            <Login />
         </Link>

         {/* <Redirect to="/auth/login" /> */}
    </>
   );
}