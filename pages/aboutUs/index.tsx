import Image from 'next/image'
import mas from '../../public/mas.png' 
import admin from '../../public/admin.png' 
export default function AboutUs () {
    return (
    <div>    
    <section className="flex flex-col justify-center antialiased bg-gray-900 text-gray-200 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
            <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                <a className="relative block group" href="#0">
                    <div className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true"></div>
                    <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                        <Image className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={mas} width="540" height="303" alt="Blog post"/>
                    </figure>
                </a>
                <div>
                    <header>
                        <div className="mb-3">
                            <ul className="flex flex-wrap text-xs font-medium -m-1">
                                <li className="m-1">
                                    <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">Product</a>
                                </li>
                                <li className="m-1">
                                    <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">Engineering</a>
                                </li>
                            </ul>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                            <a className="hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Designing a functional workflow at home.</a>
                        </h3>
                    </header>
                    <p className="text-lg text-gray-400 flex-grow">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
                    <footer className="flex items-center mt-4">
                        <a href="#0">
                            <Image className="rounded-full flex-shrink-0 mr-4" src={admin} width="40" height="40" alt="Author 04"/>
                        </a>
                        <div>
                            <a className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Chris Solerieu</a>
                            <div className="text-gray-700"> - </div>
                            <div className="text-gray-500">Jan 19, 2020</div>
                        </div>
                    </footer>
                </div>
            </article>    
        </div>
    </section>
    <div x-show="open" className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
        <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
                <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
                    <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                </svg>
        </div>
    </div>
    </div>
    )
}