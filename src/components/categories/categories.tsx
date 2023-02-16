import Image from 'next/image'
import { useRouter } from 'next/router'

export default function CategoriesList() {
  const router = useRouter()
  const img1 = '/img1.jpg'
  const categories = [
    { title: 'teatro', img: img1 },
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
    <div><h1 className='px-8 text-white bg-gray-800 rounded dark:bg-gray-500 text-xl  p-2' style={{ maxWidth: '300px', margin: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>Categorias</h1><div
      className="flex justify-center flex-col shadow-xl "
      style={{
        marginRight: '20px',
        background:'#292929', borderRadius: '10px', margin: '10px'
      }}
    >

      <div
        style={{
          overflow: 'auto',
          display: 'flex',
          width: '230px',
          height: '600px',
          marginTop: '20px',
          
        }}
        className="flex flex-col overflow-auto "
      >
        {categories.map(({ title, img }, index) => {
          return (
            <button
              className='shadow-xl '
              key={index}
              onClick={() => navigateToCategory(title)}
              style={{ margin: '2px', maxWidth: '200px', background: '#cacaca ', color: 'white', marginBottom: '10px' }}
            >
              <Image
                alt=""
                src={img}
                width={200}
                height={200}
                style={{ width: '200px', height: '120px' }} />
              <div style={{ maxWidth: '50%' }}>{title}</div>
            </button>
          )
        })}
      </div>
    </div></div>
  )
}
