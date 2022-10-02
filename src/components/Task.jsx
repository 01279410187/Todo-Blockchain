import { BsFillTrashFill } from 'react-icons/bs'


import { useContext ,useEffect} from 'react'


import {todoContext} from '../context/TodoContext'

const Task = ({taskText,onClick}) => {

  const emptyText=()=>{

    if(taskText==''){
      return alert("please Type Your Task")
    }
    else{
      return taskText
    }
  }

  useEffect(() => {
    emptyText()
  }, [])

  const {deleteTask}=useContext(todoContext)
  return (
    <div className='flex items-center text-white'>
      <div className=' bg-[#031956] text-[#b6c7db] flex w-[70%] rounded-[15px] mb-[10px] flex-1'>
        <div className='flex items-center justify-between w-full p-[20px] text-xl'>
          {taskText}
        </div>
      </div>
      <BsFillTrashFill
        onClick={onClick}
        className='text-2xl cursor-pointer ml-10'
      />
    </div>
  )
}

export default Task
