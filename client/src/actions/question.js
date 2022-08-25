import * as api from '../api'

export const askQuestion =(questionData,navigate) =>async(dispatch)=>{
    try{
        const {data} = await api.postQuestion(questionData)
        dispatch({type:"POST_QUESTION",payload:data})
        dispatch(fetchAllQuestions())
        navigate('/')
    }catch(err){
            console.log(err.message)
    }
}

export const fetchAllQuestions = () => async(dispatch) =>{
    try{
        const {data} = await api.getAllQuestions()
        dispatch({type:'FETCH_ALL_QUESTIONS',payload:data})
    }catch(err){
        console.log(err.message)
    }
}

export const deleteQuestion =(id,naviagte) => async(dispatch) =>{
    try {
        const {data}=api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        naviagte('/')
      
    } catch (err) {
            console.log(err.message);
    }
}

export const voteQuestion = (id,value,userId) => async(dispatch) =>{
    try {
        const {data}=await api.voteQuestion(id,value,userId)
        dispatch(fetchAllQuestions())
    } catch (err) {
        console.log(err.message);
    }
}
export const postAnswer =(answerData,navigate) => async(dispatch) =>{
    try {
            const {id,noOfAnswers,answerBody,userAnswered,userId} = answerData
            const {data} = await api.postAnswer(id,noOfAnswers,answerBody,userAnswered,userId)
            dispatch({type:'POST_ANSWER',payload:data})
            dispatch(fetchAllQuestions())
            navigate()
    } catch (err) {
        console.log(err.message)
    }
}


export const deleteAnswer = (id,answerId,noOfAnswers) => async(dispatch)=>{
    try{
        const {data} = await api.deleteAnswer(id,answerId,noOfAnswers)
        dispatch(fetchAllQuestions())
    }catch(err){
        console.log(err.message);
    }
}


