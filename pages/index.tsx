import Head from 'next/head'
import React from "react";
import Events from './events';
import EventNowWindow from './eventDateNow/eventNow'
import MyComponent from './map/index';
import Link from 'next/link'

export default function Home() {
  
  return (
    <div className='cursor-pointer '>
      <Head>
        <title>Weeout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-mono bg-gray-200 ">
        <main >
          <div className='pt-4 text-center bg-violet-500  mb-4 md:flex md:justify-between p-7 '>
           <h1 className=' text-2xlg'>
            Welcome to <a className='text-white' href="https://nextjs.org">Weeout</a>  
            </h1>
            <Link className=' p-1 text-1xl rounded-xl bg-violet-200 hover:bg-gray-100 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...' href={'/formUser'}>Sing In</Link>
          </div>
          <div className="flex justify-center my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 ">
              <div className="mb-4 md:flex md:justify-between">
                <div className='grid grid-flow-row gap-3'>
                  <a href="https://nextjs.org/docs" className='p-8 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
                    <h2>Caja1 &rarr;</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat esse sed consequuntur eum ducimus debitis officia ex? Sunt eos ab dignissimos expedita rerum unde assumenda voluptatum provident aut minus.</p>
                  </a>
                  <a href="https://nextjs.org/learn" className='p-8 bg-white rounded-xl shadow-md overflow-hidden '>
                  <h2>Caja2 &rarr;</h2>
                    <div>editar este texto o algo asi</div>
                  </a>
                  <div className='w-full bg-white p-5 rounded-lg'>
                    <Events/>
                  </div>
                  <div className='w-full  bg-white p-5 rounded-lg'>
                    <MyComponent/>        
                  </div>      
                  <div className=' rounded-xl p-1 bg-white grid gap-4 col-start-2 col-end-3 sm:mb-6 lg:gap-6  lg:row-span-6 lg:mb-0 overflow-y-auto h-60 ...'>
                    <EventNowWindow/>
                  </div>
                  <a
                    href="https://github.com/vercel/next.js/tree/canary/examples"
                    className='mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'
                  >
                    <h2>Caja3 &rarr;</h2>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor adipisci voluptatum, voluptates facere sint consectetur, vero aspernatur saepe, nostrum velit asperiores odit numquam maiores? Minima, explicabo aperiam. Asperiores, id officiis?</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className='text-center'>
          <h4>Footer</h4>
        </footer>
      </div>
    </div>
  )
}
