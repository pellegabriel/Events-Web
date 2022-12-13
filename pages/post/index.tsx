//pages/post.js
//other imports here
import {Authenticator,Flex,useTheme,} from "@aws-amplify/ui-react";

function Post() {

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
        //   authText="Sign Out"
        //   username={user.attributes.email.split("@")[0]}
        // >
        //   // other components here
        // </Layout>
    //   )} */}
    </Authenticator>
  );
}
export default Post;