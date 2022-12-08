// import { Switch, Route, Redirect } from 'react-router-dom';
import Link from 'next/link';
import  Home  from './home/Home';

export default function DashboardRouter(){
   return (
      <>
        <main>
           <div className="content-body">
             <div className="container-fluid">
               
                   <Link href="/dashboard/home">
                        <Home/>
                   </Link>

                   <Link href="*">
                      {/* <Redirect to="/dashboard/home" /> */}
                   </Link>
             </div>
           </div>
        </main>
      </>
   );
}