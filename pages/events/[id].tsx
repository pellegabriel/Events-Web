import React from "react"
import { useRouter } from "next/router"
import { withSSRContext } from "aws-amplify";
import { getEvent } from "../../src/graphql/queries";
import { Event } from "../../src/models";

interface IProps {
    event: Event
}

export async function getServerSideProps({ req, query }: any) {
    const SSR = withSSRContext({ req });
    const id = query.id as string
    try {
       const response = await SSR.API.graphql({ query: getEvent, variables: {id:id} });
      return {
        props: {
          event: response.data.getEvent,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        props: {},
      };
    }
  }

export default function Id({event}:IProps) {
    const router = useRouter();
    const id = router.query.id as string
    const name= router.query.comment as string

    return(
        <>

        <>{event.id}</>
        <>{event.name}</>
        
        </>
    )
}