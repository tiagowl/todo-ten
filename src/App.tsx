import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import type { Task } from './types/Task';
import { useFetch } from './hooks/useFetch';

type Input = {
  text: string;
}

function NotFoundView(){
  return(
    <article className={`w-full rounded-tl-[5px] rounded-tr-[5px] border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center`} >
          <p className={`text-sm  ml-[24px] text-[#C8CBE7]`} >Task não encontrada</p>
    </article>
  )
}

function LoadingView(){

  const todos = [
    {id: 1, text: "Complete online JavaScript course", isChecked: true},
    {id: 2, text: "Jog around the park 3x", isChecked: false},
    {id: 3, text: "10 minutes meditation", isChecked: false},
    {id: 4, text: "Read for 1 hour", isChecked: false},
    {id: 5, text: "Pick up groceries", isChecked: false},
    {id: 6, text: "Complete Todo App on Frontend mentor", isChecked: false}
  ]

  return(
    <div className="w-full h-auto flex flex-col relative opacity-60 justify-center items-center" >
      {todos?.map((item, index) => (<article className={`w-full ${index === 0 && 'rounded-tl-[5px] rounded-tr-[5px]'} border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center`} >
          <span className={`w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full ${item?.isChecked ? 'bg-gradient-to-r from-[#55DDFF] to-[#C058F3]' : 'bg-[#25273D]'}`} >
            {item?.isChecked &&<FaCheck className="text-white text-xs" />}
          </span>
          <p className={`text-sm  ml-[24px] ${item?.isChecked ? 'line-through text-[#4D5067]' : 'text-[#C8CBE7]'}`} >{item?.text}</p>
          
      </article>))}
      <div className="w-6 h-6 border-2 absolute border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function App() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>()
  
  const {get, patch, post, loading} = useFetch();

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLeft, setTasksLeft] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const [clickAll, setClickAll] = useState(false);
  const [clickCompleted, setClickCompleted] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);

  const onSubmit: SubmitHandler<Input> = async (data) => {

    const tasks = await post("/", data);

    setTasks(tasks);
  };

  const fetchTasks = async() => {

    const tasks = await get("/");

    setTasks(tasks);

    setTasksLeft(tasks.length);

  }

  const searchTasks = async () => {

    const tasks = await get(`?text=${text}`);

    if(tasks){
      setNotFound(false);
      setTasks(tasks);
    }else{
      setNotFound(true);
    }

  }

  const checkTask = async (id: number) => {

    const tasks = await patch(`/${id}/done`);

    setTasks(tasks);

    const uncheckedTasks = tasks.filter((task: Task)=> task.isChecked === false);

    setTasksLeft(uncheckedTasks.length);

  }

  useEffect(()=>{
    fetchTasks();
  }, []);

  useEffect(()=>{
    searchTasks();
  }, [text]);

  useEffect(()=>{

    if(clickAll){
      fetchTasks();
    }
  }, [clickAll])

  useEffect(()=>{

    if(clickActive){

      get("/").then(data => {
        const unchecked = data.filter((task:Task)=> task.isChecked === false);

        setTasks(unchecked);
      })

    }

  }, [clickActive])

  useEffect(()=>{

    if(clickCompleted){

      get("/").then(data => {
        const completed = data.filter((task:Task)=> task.isChecked === true);

        setTasks(completed);
      })

    }

  }, [clickCompleted])

  return (
    <main className="w-screen min-h-screen max-h-auto bg-[url('./assets/bg-desktop-dark.jpg')] bg-no-repeat pb-4 bg-[#171823] flex justify-center" >
      <div className="w-[540px] h-auto mt-[50px]" >
        <h1 className="text-white text-3xl font-bold mb-[48px]" >TODO</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[64px] rounded-[5px] mb-[24px] bg-[#25273D] flex items-center justify-between" >
          <div className="flex items-center" >
            <span className="w-[24px] h-[24px] border-solid border border-[#393A4B] ml-[24px] rounded-full" ></span>
            <input {...register("text", {required: true})} value={text} onChange={(e)=> setText(e.target.value)} placeholder="Procurar ou adicionar todo..." className="h-9 w-80 bg-[#25273D] ml-[24px] text-[#C8CBE7] focus:outline-none caret-white placeholder:text-[#C8CBE7] placeholder:text-sm" />
          </div>
          {text.length > 0 && <button type="submit" className="w-16 h-7 rounded-[5px] mr-[24px] bg-fuchsia-800 text-white text-sm" >Add</button>}
        </form>

        {loading === false && notFound === false && tasks?.map((item, index) => (<article onMouseEnter={()=>setTaskIndex(index)} className={`w-full ${index === 0 && 'rounded-tl-[5px] rounded-tr-[5px]'} border-b-[#393A4B] border-solid border-b h-[64px] bg-[#25273D] flex items-center justify-between`} >
          <div className="flex items-center" >
            <span onClick={()=> checkTask(item?.id)} className={`w-[24px] h-[24px] border-solid border flex items-center justify-center border-[#393A4B] ml-[24px] rounded-full ${item?.isChecked ? 'bg-gradient-to-r from-[#55DDFF] to-[#C058F3]' : 'bg-[#25273D]'}`} >
              {item?.isChecked &&<FaCheck className="text-white text-xs" />}
            </span>
            <p className={`text-sm  ml-[24px] ${item?.isChecked ? 'line-through text-[#4D5067]' : 'text-[#C8CBE7]'}`} >{item?.text}</p>
          </div>
          {taskIndex === index && <IoCloseSharp className="mr-[24px] text-2xl text-[#5B5E7E] hover:text-white" />}
        </article>))}

        {loading === true && <LoadingView/>}

        {notFound === true && <NotFoundView/>}

        <article className="w-full h-[55px] rounded-bl-[5px] rounded-br-[5px] bg-[#25273D] px-[24px] flex items-center justify-between" >
          <p className="text-xs text-[#5B5E7E]" >{tasksLeft} items left</p>

          <div className="flex justify-between w-36" >
            <p onClick={()=>{setClickAll(true), setClickActive(false), setClickCompleted(false)}} className={`text-xs hover:text-white ${clickAll ? 'text-[#3A7CFD]' : 'text-[#5B5E7E]'}`} >All</p>
            <p onClick={()=>{setClickAll(false), setClickActive(true), setClickCompleted(false)}} className={`text-xs hover:text-white ${clickActive ? 'text-[#3A7CFD]' : 'text-[#5B5E7E]'}`} >Active</p>
            <p onClick={()=>{setClickAll(false), setClickActive(false), setClickCompleted(true)}} className={`text-xs hover:text-white ${clickCompleted ? 'text-[#3A7CFD]' : 'text-[#5B5E7E]'}`} >Completed</p>
          </div>

          <p className="text-xs text-[#5B5E7E] hover:text-white" >Clear Completed</p>
        </article>
        

      </div>
    </main>
  )
}

export default App
