import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";

import axios from "axios";
class ActionProvider {
    constructor(createChatBotMessage,setStateFunc){
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
   }
  //  greet=() =>{
  //   const message = this.createChatBotMessage("hello ,karthi,Lucky")
  //   this.setChatbotMessage(message)
  //  }

   setChatbotMessage = (message) =>{
    this.setState(state =>({...state,messages:[...state.messages,message]}) )
   }

   name = async()=>{
    const sendMessage=this.createChatBotMessage('My name is stackBot')
    this.setChatbotMessage(sendMessage)
   }

   greet=async()=>{
    const sendMessage=this.createChatBotMessage('Hello ask your question')
    this.setChatbotMessage(sendMessage)
   }

   age=async()=>{
    const sendMessage=this.createChatBotMessage('Im a bot,🤣🤣 i have no life')
    this.setChatbotMessage(sendMessage)
   }
     
      answer =async (message) =>{
        // const {data} =await axios.post('http://localhost:5000/chatbot/',{message})
        // var snippets = data["knowledge_graph"]?.description
        // if(snippets?.length == 0){
        //   snippets = data["related_questions"].map(d => <li key={d.link}>{d.snippet}</li>)
        // }
        
        const sendMessage=this.createChatBotMessage(`By StackBot`,{widget:"answer"})
        this.setChatbotMessage(sendMessage)

      }


 }
 
 export default ActionProvider;