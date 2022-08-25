class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase()
      // if(lowercase.includes('h')){
      //   console.log('hiii');
      //   this.actionProvider.greet()
      // }

      // if(lowercase.includes("todos")){
      //   this.actionProvider.todosHandler()
      // }
      this.actionProvider.answer(message)
    }
  }
  
export default MessageParser;