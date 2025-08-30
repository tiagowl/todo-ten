import { useState } from 'react'
import { FaCheck } from "react-icons/fa";

function App() {
  

  return (
    <main className="w-screen min-h-screen max-h-auto bg-[url('./assets/bg-desktop-dark.jpg')] bg-no-repeat pb-4 bg-[#171823] flex justify-center" >
      <div className="w-[540px] h-auto mt-[50px]" >
        <h1 className="text-white text-3xl font-bold mb-[48px]" >TODO</h1>

        <form className="w-full h-[64px] rounded-[5px] mb-[24px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border border-[#393A4B] ml-[24px] rounded-full" ></span>
          <input placeholder="Type todo here..." className="h-9 w-80 bg-[#25273D] ml-[24px] text-[#C8CBE7] focus:outline-none caret-white placeholder:text-[#C8CBE7] placeholder:text-sm" />
        </form>

        <article className="w-full rounded-tl-[5px] rounded-tr-[5px] border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full bg-gradient-to-r from-[#55DDFF] to-[#C058F3]" >
            <FaCheck className="text-white text-xs" />
          </span>
          <p className="text-sm text-[#4D5067] ml-[24px] line-through" >Complete online JavaScript course</p>
        </article>
        <article className="w-full border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full" >
          </span>
          <p className="text-sm text-[#C8CBE7] ml-[24px]" >Complete online JavaScript course</p>
        </article>
        <article className="w-full border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full" >
          </span>
          <p className="text-sm text-[#C8CBE7] ml-[24px]" >Complete online JavaScript course</p>
        </article>
        <article className="w-full border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full" >
          </span>
          <p className="text-sm text-[#C8CBE7] ml-[24px]" >Complete online JavaScript course</p>
        </article>
        <article className="w-full border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full" >
          </span>
          <p className="text-sm text-[#C8CBE7] ml-[24px]" >Complete online JavaScript course</p>
        </article>
        <article className="w-full border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center" >
          <span className="w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full" >
          </span>
          <p className="text-sm text-[#C8CBE7] ml-[24px]" >Complete online JavaScript course</p>
        </article>
        <article className="w-full h-[55px] rounded-bl-[5px] rounded-br-[5px] bg-[#25273D] px-[24px] flex items-center justify-between" >
          <p className="text-xs text-[#5B5E7E]" >5 items left</p>

          <div className="flex justify-between w-36" >
            <p className="text-xs hover:text-white text-[#3A7CFD]" >All</p>
            <p className="text-xs text-[#5B5E7E] hover:text-white" >Active</p>
            <p className="text-xs text-[#5B5E7E] hover:text-white" >Completed</p>
          </div>

          <p className="text-xs text-[#5B5E7E] hover:text-white" >Clear Completed</p>
        </article>
        

      </div>
    </main>
  )
}

export default App
