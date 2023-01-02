import Image from 'next/image'
import svg1 from '../../../public/svg1.svg'
import svg2 from '../../../public/svg2.svg'

export default function Ilustration () {
    return (
        <div className='flex justify-center flex-col p-40'>
          <div className='flex p-10  max-w-md items-center'>
          <Image alt='' src={svg1} width={600} height={600}/>
            <h2 className=' flex justify-center p-10 xl:font-serif text-3xl text-white'>Es un espacio digital que brinda un servicio gratuito para agentes culturales y aficionados a la cultura, el arte y ocio. </h2>
          </div>
          <div className='flex p-10 mt-20 max-w-md items-center'>
          <Image alt='' src={svg2} width={600} height={600}/>
          <h2  className='flex justify-center p-10 xl:font-serif text-3xl text-white'>
           Nuestro objetivo es facilitar a través de nuestra página, el encuentro entre nuestros artistas y productores culturales y todos aquellos que deseen disfrutar de esta oferta.
            </h2> 
          </div>
        </div>
    )
}
     