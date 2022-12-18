class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }

  
    parse(message) {
      const lowercase = message.toLowerCase()
      if(lowercase.includes('hii') || lowercase.includes('hello')){
        return this.actionProvider.greet();
      }
      if(lowercase.includes('your name')){
        console.log('hiii');
        return this.actionProvider.name()
      }

      if(lowercase.includes('your age')){
        console.log('hiii');
        return this.actionProvider.age()
      }


      // if(lowercase.includes("todos")){
      //   this.actionProvider.todosHandler()
      // }
      this.actionProvider.answer(message)
    }
  }
  
export default MessageParser;