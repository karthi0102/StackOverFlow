import React from 'react'
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvator from './BotAvator/BotAvator';
import BotHeader from './BotHeader/BotHeader';
import Answer from './Answer/Answer';

const config = {

  initialMessages: [createChatBotMessage('Ask your doubts to the StackBot')],
  botName:"StackBot",
  customComponents :{
    header: (props) => <BotHeader {...props} />,
    botAvatar:(props) => <BotAvator {...props} />,
  },
  customStyles :{
    botMessageBox:{
        backgroundColor:'#ef8236'
    },
    chatButton:{
        backgroundColor:'#ef8236'
    }
  },
  state:{
    ans:''
  },
  
 widgets:[ 
  {
    widgetName: 'answer',
    widgetFunc: (props) => <Answer {...props} />,
    mapStateToProps: ['ans'],
  }
]

}

export default config