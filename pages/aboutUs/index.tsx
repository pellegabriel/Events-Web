import Link from 'next/link'
import Ilustration from '../../src/components/Ilustracion/Ilustracion'
export default function AboutUs() {
  return (
    <div style={{ 
        background: 'black',
      }} >
        <nav  className=" p-2 mt-0 w-full z-10 top-0 mb-12 border-b border-gray-300">
          <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white">
                <div className="flex text-2xl pl-2">
                  <div className="em em-grinning"></div>
                  <div className='text-5xl' style={{color:'white'}}>WeeOut</div>
                </div>
            </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
              <li className="mr-3">
                <Link
                  href="/"
                     className=" hover:bg-rose-500  text-white   py-2 px-4 border border-transparent hover:text-black  flex items-center justify-center"
      >
                  Pagina principal
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/profile"
                     className=" hover:bg-rose-500  text-white   py-2 px-4 border border-transparent hover:text-black  flex items-center justify-center"
      >
                   Tu perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="items-center flex flex-col justify-center antialiased pb-40 text-black-200 pt-0">
        <Ilustration />
      </section>
      <div
        x-show="open"
        className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60"
        x-data="{ open: true }"
      >
        <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
          <svg
            className="w-4 h-4 flex-shrink-0 fill-current"
            viewBox="0 0 16 16"
          >
            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
