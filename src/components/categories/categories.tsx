import Link from "next/link";
import Image from 'next/image'
import img1 from '../../../public/IMG1.png'


export default function CategoriesList () {
    const categories = ["Teatro ", "Musica", "Actividades sociales", "Baile", "Presentaciones",
                        "Arte", "Comunidad y medio ambiente", "Deportes", "Actividad  fisica",
                        "Literatura", "Política", "Religion", "Espiritualidad", "Salud y bienestar",
                        "Trabajo y negocios", "Vida nocturna"]
    return (
        <div className="flex justify-center flex-col items-center" style={{
            maxWidth: '1400px',
            marginBottom: '100px'
        }}>
            <h1>Categorias</h1>
            <div style={{
                overflow: "auto",
                maxWidth: "80%",
                display: "flex", 
            }}>
             
                {categories.map((category, index)=>{
                    return(
                        <Link href={"/"} style={{margin: '2px',
                            minWidth: '200px'}}
                            key={index}>
                            <Image
                                alt=""
                                src={img1}
                                width={200}
                                height={200}
                                style={{ width: '180px', height: '120px',
                                         }}
                            />
                            <div>{category}</div>
                        </Link>
                    )
                } )}
            </div>
        </div>
    )
}