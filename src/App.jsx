
import './App.css'
import WrongNetworkMessage from './components/WrongNetworkMessage'
import ConnectWalletButton from './components/ConnectWallet'
import TodoList from './components/TodoList'

import {todoContext} from './context/TodoContext'
import { useContext } from 'react'

function App() {

  const {currnrtAcount}=useContext(todoContext)
  

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
    {currnrtAcount === '' ? (
     <ConnectWalletButton/>
      ) : (
      <TodoList />
    )}
    </div>
  )
}

export default App
