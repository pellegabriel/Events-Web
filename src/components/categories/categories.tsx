import { useRouter } from 'next/router'
import { CategoryItem } from '../categoryItem/categoryItem'
import { useGetCategories } from '../../../api/categories'

export default function CategoriesList() {
  const router = useRouter()
  const { data, error, loading } = useGetCategories();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
        marginTop: ' 100px',
      }}
    >
      <h1
        style={{
          color: 'white',
          paddingLeft: 0,
          fontSize: '24px',
          marginBottom: '32px',
          backgroundColor: 'transparent',
        }}
      >
        Selecciona tus intereses
      </h1>

      <div
        style={{
          width: '100%',
          borderBottomLeftRadius: '10PX',
          borderBottomRightRadius: '10PX',
        }}
        className="flex justify-center flex-col"
      >
        <div
          style={{
            gap: '16px',
            width: '100%',
            display: 'flex',
            overflow: 'auto',
            paddingBottom: '16px',
          }}
        >
          {data && data.map(({ label }) => {
            return (
              <CategoryItem
                key={label}
                title={label}
                onClick={() => navigateToCategory(label)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
