//pages/post.js
//other imports here
import {Authenticator,Flex,useTheme,} from "@aws-amplify/ui-react";
import Profile from "./profile";
import { withAuthenticator } from "@aws-amplify/ui-react";

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
      <Profile/>
      <div style={{ padding: 50 }}>
      <h1>Logged in as {user.username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
      <div>This page was server-side rendered on {renderedAt}.</div>
      </div>
    </Authenticator>
    
  );
}
export default withAuthenticator(Post);