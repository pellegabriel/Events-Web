// import { Redirect, Route } from "react-router-dom";
import Link from 'next/link'

interface Props {
   loggedIn:boolean | undefined,
   component:any,
}

export function PrivateRouter({ loggedIn, component }:Props){
 return (
    <>
      {
         loggedIn ? (
            <Link href={component}/>
            //   <Route  component={component} />
         ): (
            // <Redirect to="/auth" />
            <Link href="/auth" />
            )
      }
    </>
 );
}