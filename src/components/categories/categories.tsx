import Image from 'next/image'
import img1 from '../../../public/img1.jpg'
import { useRouter } from 'next/router'

export default function CategoriesList() {
  const router = useRouter()

  const categories = [
    { title: 'teatro', img: img1 },
    { title: 'deportivo', img: img1 },
    { title: 'Musica', img: img1 },
    { title: 'Actividades sociales', img: img1 },
    { title: 'Baile', img: img1 },
    { title: 'Presentaciones', img: img1 },
    { title: 'Arte', img: img1 },
    { title: 'Medio ambiente', img: img1 },
    { title: 'Deportes', img: img1 },
    { title: 'Actividad  fisica', img: img1 },
    { title: 'Literatura', img: img1 },
    { title: 'Política', img: img1 },
    { title: 'Religion', img: img1 },
    { title: 'Espiritualidad', img: img1 },
    { title: 'Salud y bienestar', img: img1 },
    { title: 'Trabajo y negocios', img: img1 },
    { title: 'Vida nocturna', img: img1 },
  ]

  const navigateToCategory = (categoryTitle: string) => {
    router.push({
      pathname: 'events',
      query: { categoryTitle },
    })
  }

  return (
    <div
      className="flex justify-center flex-col "
      style={{ marginRight: '20px' }}
    >
      <h1 className='px-8 text-white bg-gray-600 rounded dark:bg-gray-500 text-xl  p-2' style={{maxWidth:'185px'}}>Categorias</h1>
      <div
        style={{
          overflow: 'auto',
          display: 'flex',
          width: '230px',
          height: '600px',
        }}
        className="flex flex-col overflow-auto"
      >
        {categories.map(({ title, img }, index) => {
          return (
            <button
              key={index}
              onClick={() => navigateToCategory(title)}
              style={{ margin: '2px', minWidth: '200px' }}
            >
              <Image
                alt=""
                src={img}
                width={200}
                height={200}
                style={{ width: '180px', height: '120px' }}
              />
              <div style={{ maxWidth: '50%' }}>{title}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
