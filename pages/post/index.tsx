//pages/post.js
//other imports here
import {Authenticator,Flex,useTheme,} from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Image from 'next/image'
import user1 from '../../public/user1.png'
import Link from 'next/link'
import Events from '../../src/components/events'

interface IHome {
  signOut: ()=> void
  
  user: Record<string, any>
  renderedAt: string;
}
export function getServerSideProps() {
  const renderedAt = new Date();
  const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
    timeStyle: "long",
  });
  return {
    props: {
      renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
    },
  };
}


function Post({signOut, user, renderedAt}: IHome) {

const authComponents = {
    Header() {
      const { tokens } = useTheme();
      return (
        <Flex
          justifyContent={"center"}
          direction="column"
          paddingTop={tokens.space.xxxl}
          paddingBottom={tokens.space.xxl}
        >
          
        </Flex>
      );
    },
  };

  return (
    <Authenticator components={authComponents} hideSignUp={true}>
      {/* {({ signOut, user }) => ( */}
        {/* // <Layout */}
        {/* //   handleClick={() => signOut()}
          authText="Sign Out"
          username={user.attributes.email.split("@")[0]}
        >
          // other components here
        </Layout>
      )} */}
      <div>
        <div className='mt-10 p-8 h-full flex items-center justify-center'>
        
        
            <div className=" break-words bg-white shadow-lg rounded-xl mt-16 ">
            <div className="">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full flex justify-center">
                        <div className="relative">
                            <Image alt='' src={user1} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                        </div>
                    </div>
                    <div className="w-full text-center mt-20">
                        <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                            {/* <div className="p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">3,360</span>
                                <span className="text-sm text-slate-400">Photos</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">2,454</span>
                                <span className="text-sm text-slate-400">Followers</span>
                            </div>
        
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
                                <span className="text-sm text-slate-400">Following</span>
                            </div> */}
                        </div>
                        
                    </div>
                </div>
                <div className="text-center mt-2">
                    <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user.username}</h3>
                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                              <div className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75">This page was server-side rendered on {renderedAt}.</div>
                    </div>
                </div>
                <div className=" flex mt-6 py-6 border-t border-slate-300 text-center">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-10 mb-20">
                            <div className="font-light leading-relaxed text-slate-600 p-8 ">An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</div>
                        </div>
                    </div>
                </div>
                
            </div>
        <div className='p-8  flex justify-center'>
        <div className="">
            <Events/>
            <Link href='/post/eventUserAdm' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent roundeds'>
                Administra eventos, crea o actualizalos
            </Link>
                   <div onClick={signOut}>Sign out</div>

            </div>
        </div>
        </div>
        </div>
        </div>
    </Authenticator>
    
  );
}
export default withAuthenticator(Post);