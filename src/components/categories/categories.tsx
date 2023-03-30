import { useRouter } from 'next/router'
import { CategoryItem } from '../categoryItem/categoryItem'

export default function CategoriesList() {
  const router = useRouter()
  const img1 = '../../art.jpg'
  //hacer esto con todas las img de cada categoria
  const categories = {
    firstRow: [
    { title: 'Teatro', image: img1 },
    { title: 'Musica', image: img1 },
    { title: 'Actividades sociales', image: img1 },
    { title: 'Baile', image: img1 },
    { title: 'Presentaciones', image: img1 },
    { title: 'Arte', image: img1 },
    { title: 'Medio ambiente', image: img1 },
    { title: 'Deportes', image: img1 },
    ],
    secondRow: [      
      { title: 'Actividad  fisica', image: img1 },
      { title: 'Literatura', image: img1 },
      { title: 'Política', image: img1 },
      { title: 'Religion', image: img1 },
      { title: 'Espiritualidad', image: img1 },
      { title: 'Salud y bienestar', image: img1 },
      { title: 'Trabajo y negocios', image: img1 },
      { title: 'Vida nocturna', image: img1 },
    ]
  }

  const navigateToCategory = (categoryTitle: string) => {
    router.push({
      pathname: 'events',
      query: { categoryTitle },
    })
  }

  return (
    <div
      style={{
        width: '1200px',
        marginTop:' 300px'
      }}
    >
      <h1
        style={{
          color: 'white',
          paddingLeft: 0,
          fontSize: '24px',
          marginBottom: '32px',
          backgroundColor:'transparent',
        }}
      >
        Selecciona tus intereses
      </h1>

      <div
        className="flex justify-center flex-col"
        style={{
          borderBottomLeftRadius:'10PX',
          borderBottomRightRadius:'10PX',
        }}
      >
      <div
        style={{
          gap: '16px',
          width: '100%',
          display: 'flex',
          overflow: 'auto',
          paddingBottom: '16px',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            gap: '16px',
            width: '100%',
            display: 'flex',
          }}
        >
          {categories.firstRow.map(({ title }, index) => {
            return (
              <CategoryItem
                key={title}
                title={title}
                onClick={() => navigateToCategory(title)}
              />
          )})}
        </div>
        <div
          style={{
            gap: '16px',
            width: '100%',
            display: 'flex',
          }}
        >
          {categories.secondRow.map(({ title }, index) => {
            return (
              <CategoryItem
                key={title}
                title={title}
                onClick={() => navigateToCategory(title)}
              />
          )})}
        </div>
      </div>
    </div>
  </div>
  )
}
