import React,{useState,useEffect} from 'react'
import {ethers} from 'ethers'
import { TodoAbi,TodoAddress } from '../utils/contract';



export const  todoContext=React.createContext()

const {ethereum}=window;
const createContract=()=>{


            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const todoContract = new ethers.Contract(
                TodoAddress,
                TodoAbi,
              signer
            )

    return todoContract;
}
const TodoContext = ({children}) => {

    const [currnrtAcount, setcurrnrtAcount] = useState('')
    const [tasks, settask] = useState([]) 
    const [input, setinput] = useState('')

   


    const detectProvider=()=>{

    }


    const addTask = async () => {
        let task = {
          'taskText': input,
          'isDeleted': false
        };

       
    
        try {
         
    
          if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const TwitterContract = new ethers.Contract(
                TodoAddress,
                TodoAbi,
              signer
            )
            if(task.taskText===''){ 
              return alert("please Add Your Task")
             }else{
     
            let twitterTx = await TwitterContract.addTask(task.taskText, task.isDeleted);
           
            console.log(twitterTx);


            
            
           
           }
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch(error) {
          console.log("Error submitting new Tweet", error);
        }
      }
    
      const sendTask = (e) => {
        e.preventDefault();
    
        addTask();
    
       
        setinput("");
      };

      
    const deleteTask=key=>async()=>{


        try {

            if(ethereum){

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
               const TwitterContract = new ethers.Contract(
                TodoAddress,
                TodoAbi,
                signer
               )
                const deleteMyTask=await TwitterContract.deleteTask(key,true);
                console.log("Success Delete Tasck",deleteMyTask)
                const alltask=await TwitterContract.getMyTasks();

                settask(alltask)
            }
            else{
                console.log("No ethereum Object")
            }
            
        } catch (error) {
            console.log(error)
        }

    }


    const getAllTask=async()=>{
        try {
            if(ethereum) {

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
               const TwitterContract = new ethers.Contract(
                TodoAddress,
                TodoAbi,
                signer
               )
            const getTask= await TwitterContract.getMyTasks()
            console.log(getTask)
            settask(getTask)
            
            
            }else{
                console.log("Ethereum Object No Exist")
            }
        } catch (error) {

            console.log(error)
            
        }
    }
    

    const connectWallet =async()=>{

        try {
            if(!ethereum) return alert("Please install metask")
            const accounts=await ethereum.request({method : 'eth_requestAccounts'})

            if(accounts.length){
                setcurrnrtAcount(accounts[0])
            }else{
                console.log("No Account Fount")
            }
            
        } catch (error) {

            console.log(error)
            throw new Error("No ethereum Object")
            
        }

    }
    const checkIFwallletConnteted=async()=>{
        try {
            if(!ethereum) return alert("Please isntall metamask")

            const acounts = await ethereum.request({method: 'eth_accounts'});
            if(acounts.length){
                setcurrnrtAcount(acounts[0])
            }
            else{
                console.log("No Account Found")
            }
        } catch (error) {
            console.log(error)
            throw new Error ("No ethereum Object")
        }

    }

    useEffect(() => {
        checkIFwallletConnteted()
        getAllTask()
        connectWallet()
    }, [])

    

    
  return (
    <todoContext.Provider value={{
        currnrtAcount,connectWallet,tasks,addTask,deleteTask,input,setinput,sendTask
    }}>
      {children}
    </todoContext.Provider>
  )
}

export default TodoContext