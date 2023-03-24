import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CategoryItem } from '../categoryItem/categoryItem'

export default function CategoriesList() {
  const router = useRouter()
  const img1 = '/img1.jpg'
  const categories = [
    { title: 'Teatro', image: img1 },
    { title: 'Musica', image: img1 },
    { title: 'Actividades sociales', image: img1 },
    { title: 'Baile', image: img1 },
    { title: 'Presentaciones', image: img1 },
    { title: 'Arte', image: img1 },
    { title: 'Medio ambiente', image: img1 },
    { title: 'Deportes', image: img1 },
    { title: 'Actividad  fisica', image: img1 },
    { title: 'Literatura', image: img1 },
    { title: 'Política', image: img1 },
    { title: 'Religion', image: img1 },
    { title: 'Espiritualidad', image: img1 },
    { title: 'Salud y bienestar', image: img1 },
    { title: 'Trabajo y negocios', image: img1 },
    { title: 'Vida nocturna', image: img1 },
  ]

  const navigateToCategory = (categoryTitle: string) => {
    router.push({
      pathname: 'events',
      query: { categoryTitle },
    })
  }
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };
  const boxStyle = {maxWidth:'700px'   ,backgroundColor: isHover ? '#a561bf'  : '#170b0e', color:'white',
}
  return (
    <div style={{marginLeft:'10px'
  }}><h1 className='px-8 text-white   dark:bg-gray-500 text-xl font-extrabold  p-2' style={{ maxWidth: '300px', backgroundColor:'#170b0e' }}>Categorias</h1><div
      className="flex justify-center flex-col  "
      style={{
       borderBottomLeftRadius:'10PX',
        borderBottomRightRadius:'10PX'
        
      }}
    >

      <div
        style={{
          overflow: 'auto',
          display: 'flex',
          width: '230px',
          height: '600px'
          
        }}
        className="flex flex-col overflow-auto "
      >
        {categories.map(({ title, image }, index) => {
          return (
            <CategoryItem title={title} image={image}/>
          )
        })}
      </div>
    </div></div>
  )
}
