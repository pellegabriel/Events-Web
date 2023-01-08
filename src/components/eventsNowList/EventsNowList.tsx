import Image from 'next/image'
import img1 from '../../../public/IMG1.jpg'
import { useRouter } from "next/router";

export default function EventsNowList () {
    const router = useRouter()

    const categories = [
        {title:"teatro", img: img1},
        {title:"deportivo", img: img1},
        {title:"Musica", img: img1},
        {title:"Baile", img: img1},
        {title:"Presentaciones", img: img1},
        {title:"Arte", img: img1},
    ]

    const navigateToCategory =(categoryTitle: string)=>{
        router.push({
            pathname: 'events',
            query: { categoryTitle },
        })
    }

    return (
        <div
            style={{
                width: '800px',
                display: "flex",
                flexDirection:"row", 
                height: '180px' ,
                overflow: "auto",
                marginBottom: '64px'
            }}
        >
            {categories.map(({ title, img }, index)=>{
                return(
                    <button
                        key={index}
                        onClick={()=>navigateToCategory(title)}
                        style={{ margin: '2px', minWidth: '200px' }}
                    >
                        <Image
                            alt=""
                            src={img}
                            width={200}
                            height={200}
                            style={{ width: '180px', height: '120px' }}
                        />
                    </button>
                )
            } )}
        </div>
    )
}