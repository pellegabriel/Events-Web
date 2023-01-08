import Image from 'next/image'
import svg1 from '../../../public/svg1.svg'
import svg2 from '../../../public/svg2.svg'

export default function Ilustration() {
  return (
    <div className="flex justify-center flex-col p-40 " style={{maxWidth:"1600px"}}>
      <div className="flex p-10  max-w-md items-center bg-gray" style={{ background:'#E5E8E8'}}>
        <Image alt="" src={svg1} width={600} height={600} />
        <h2 className=" flex justify-center p-10 xl:font-serif text-3xl text-black">
          Es un espacio digital que brinda un servicio gratuito para
                agentes culturales y aficionados a la cultura, el arte y ocio.
                Nuestro objetivo es facilitar a través de nuestra página, el
                encuentro entre nuestros artistas y productores culturales y
                todos aquellos que deseen disfrutar de esta oferta.
        </h2>
      </div>
      <div className="flex p-10 mt-20 max-w-md items-center" style={{ background:'#E5E8E8'}}>
        <Image alt="" src={svg2} width={600} height={600} />
        <h2 className="flex justify-center p-10 xl:font-serif text-3xl text-black">
                A través nuestro podrás generar o buscar eventos de
                acuerdo a tu interés. Podés saber qué está pasando en este
                preciso momento en el lugar en donde estés y acceder a la
                información detallada de la actividad, precios y modalidades de
                manera sencilla y gratuita. Sólo un click te permitirá encontrar
                lo que buscás para disfrutar de un momento agradable, acorde a
                tu necesidad y bolsillo. Sumate a nuestra comunidad de usuarios.
        </h2>
      </div>
    </div>
  )
}
