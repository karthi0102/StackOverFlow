import React from 'react'
import Chatbot from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import ActionProvider from './ActionProvider';
import './ChatBot.css';

function ChatBot() {

  return (
    
        <div className="chatbot-container">
          <div className="chatbot-inner-container">
            <Chatbot
              config={config} 
              actionProvider={ActionProvider}
              messageParser={MessageParser} 
              />
         </div>
        </div>
      
  
  );
}

export default ChatBot;
