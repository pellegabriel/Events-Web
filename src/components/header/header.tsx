import Link from "next/link";

export default function Header (){
    return (
        <nav className="bg-violet-800 p-2 mt-0 fixed w-full z-10 top-0">
          <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
              <div className="text-white no-underline hover:text-white hover:no-underline">
                <div className="flex text-2xl pl-2">
                  <div className="em em-grinning"></div>
                  Bienvenido a<div className="text-yellow-500 mx-2">Weeout</div>
                </div>
              </div>
            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
                <li className="mr-3">
                  <Link
                    href="/aboutUs"
                    style={{background:'#138D75'}} className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"                   >
                    Pagina principal
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    href="/profile"
                    style={{background:'#138D75'}} className=" text-white font-semibold   py-2 px-4 border border-yellow-500 hover:border-transparent rounded flex items-center justify-center"                  >
                    Empieza ahora
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}