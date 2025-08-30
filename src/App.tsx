import { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

function App() {
  

  return (
    <div className='w-full h-screen relative flex justify-end items-end' >

        <button className="bg-black w-14 h-14 rounded-full flex items-center justify-center right-7 bottom-7 absolute fixed" >
          <FiPlus className="text-white text-2xl" />
        </button>

      <main className="w-full h-screen px-4 py-5 flex flex-col" >
        
        

        <h1 className="font-semibold text-black text-3xl mb-6" >Todo List</h1>

        <form className="w-screen flex h-auto mb-4" >
          <div className="relative w-56">
            <LuSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'  />
            <input type="text" placeholder="Search tasks..." className="border pl-10 placeholder:text-sm border-gray-200 border-solid w-full h-9 bg-white rounded-md"/>
          </div>
        </form>

        {[0,1,2,3,4].map(() => ( <article className="w-full h-auto mb-4 p-5 rounded-2xl border flex flex-col border-gray-200 border-solid" >
          <div className="w-full flex items-center" >
            <span className="h-5 w-5 rounded-md border border-solid border-gray-200" ></span>
            <h2 className="text-black ml-3 font-semibold text-md" >Design homepage layout</h2>
            <LuStar className="text-lg ml-3 text-gray-300" />
          </div>

          <div className="flex w-full items-center pl-8 mt-2" >
            <span className="border px-1 items-center rounded-md flex border-solid border-gray-200 w-auto h-6" >
              <p className="text-xs" >Emily Carter</p>
            </span>
            <span className="border px-1 items-center ml-2 rounded-md flex border-solid border-gray-200 w-auto h-6" >
              <p className="text-xs" >Liam Walker</p>
            </span>

            <LuCalendar className="text-sm text-gray-400 ml-4" />
            <p className="text-xs text-gray-500 ml-1" >Jun 4, 2023</p>

            <MdOutlineNotificationsNone className="text-md ml-3 text-gray-400" />

            <p className="text-xs text-gray-500 ml-3" >Substasks: 1/2</p>
          </div>

        </article>))}
      </main>
    </div>
  )
}

export default App
