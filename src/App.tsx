import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaCheck } from "react-icons/fa";
import type { Task } from './types/Task';
import { useFetch } from './hooks/useFetch';

type Input = {
  text: string;
}

function App() {

  const todos = [
    {id: 1, text: "Complete online JavaScript course", isChecked: true},
    {id: 2, text: "Jog around the park 3x", isChecked: false},
    {id: 3, text: "10 minutes meditation", isChecked: false},
    {id: 4, text: "Read for 1 hour", isChecked: false},
    {id: 5, text: "Pick up groceries", isChecked: false},
    {id: 6, text: "Complete Todo App on Frontend mentor", isChecked: false}
  ]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);
  const {get, patch} = useFetch();

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async() => {

    const tasks = await get("/");

    setTasks(tasks);

  }

  const searchTasks = async () => {

    const tasks = await get(`?text=${text}`);

    setTasks(tasks);
  }

  const checkTask = async (id: number) => {

    const tasks = await patch(`/${id}/done`);

    setTasks(tasks);

  }

  useEffect(()=>{
    fetchTasks();
  }, []);

  useEffect(()=>{
    searchTasks();
  }, [text]);

  return (
    <main className="w-screen min-h-screen max-h-auto bg-[url('./assets/bg-desktop-dark.jpg')] bg-no-repeat pb-4 bg-[#171823] flex justify-center" >
      <div className="w-[540px] h-auto mt-[50px]" >
        <h1 className="text-white text-3xl font-bold mb-[48px]" >TODO</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[64px] rounded-[5px] mb-[24px] bg-[#25273D] flex items-center justify-between" >
          <div className="flex items-center" >
            <span className="w-[24px] h-[24px] border-solid border border-[#393A4B] ml-[24px] rounded-full" ></span>
            <input {...register("text", {required: true})} value={text} onChange={(e)=> setText(e.target.value)} placeholder="Procurar ou adicionar todo..." className="h-9 w-80 bg-[#25273D] ml-[24px] text-[#C8CBE7] focus:outline-none caret-white placeholder:text-[#C8CBE7] placeholder:text-sm" />
          </div>
          {text.length > 0 && <button className="w-16 h-7 rounded-[5px] mr-[24px] bg-fuchsia-800 text-white text-sm" >Add</button>}
        </form>

        {tasks?.map((item, index) => (<article className={`w-full ${index === 0 && 'rounded-tl-[5px] rounded-tr-[5px]'} border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center`} >
          <span onClick={()=> checkTask(item?.id)} className={`w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full ${item?.isChecked ? 'bg-gradient-to-r from-[#55DDFF] to-[#C058F3]' : 'bg-[#25273D]'}`} >
            {item?.isChecked &&<FaCheck className="text-white text-xs" />}
          </span>
          <p className={`text-sm  ml-[24px] ${item?.isChecked ? 'line-through text-[#4D5067]' : 'text-[#C8CBE7]'}`} >{item?.text}</p>
        </article>))}

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
