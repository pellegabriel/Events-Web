import React from "react"
import { useRouter } from "next/router"

export default function Id() {
    const router = useRouter();
    const id = router.query.id as string
    const name= router.query.comment as string

    return(
        <>

        <>{id}</>
        <>{name}</>
        
        </>
    )
}