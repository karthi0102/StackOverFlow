import React,{useState} from 'react'
import {useParams,Link,useNavigate,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Avator from '../../components/Avator/Avator'
import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'
import { useSelector } from 'react-redux'
import {postAnswer,deleteQuestion,voteQuestion} from '../../actions/question'
import DisplayAnswer from './DisplayAnswer'
import moment from  'moment'
import copy from 'copy-to-clipboard'

const QuestionsDetails = () => {
    const {id}= useParams()
    const questionsList = useSelector(state => state.questionsReducer)
    const [Answer, setAnswer] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url ='https://stack-over-flow-45.herokuapp.com/'
    const handlePostAnswer = (e, answerLength) =>{
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question')
            navigate('/Auth')
        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            } else{
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name,userId:User.result._id }))
            }
        }
    }

    const handleShare = () => {
        copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname)
    }


    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote',User.result._id))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote',User.result._id))
    }
    const DeleteQuestion = () =>{
     dispatch(deleteQuestion(id,navigate))   
    }
    
  return (
   <div className='question-details-page'>
    
           {
            questionsList.data === null  ?
            <h1>Loading ..</h1> :
             <>
             {
                questionsList.data.filter(question =>  question._id === id).map(question => (
                        <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className="question-details-container-2">
                                            <div className="question-votes">
                                                <img src={upVote} alt="upVote" className='votes-icon' width="18" onClick={handleUpVote} />
                                                <p>{question.upVote.length - question.downVote.length}</p>
                                                <img src={downVote} alt="downVote" className='votes-icon' width="18" onClick={handleDownVote} />
                                            </div>
                                            <div style={{width:"100%"}}>
                                                    <p className='questions-body'>{question.questionBody}</p>
                                                    <div className="question-details-tags">
                                                        {
                                                            question.questionTags.map((tag)=>(
                                                                <p key={tag}>{tag}</p>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="question-actions-user">
                                                        <div>
                                                            <button type="button" onClick={handleShare}>Share</button>
                                                            {User?.result?._id === question.userId && <button type="button" onClick={DeleteQuestion}>Delete</button>}
                                                            
                                                        </div>
                                                        <div>
                                                            <p>asked {moment(question.askedOn).fromNow()}</p>
                                                            <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                                <Avator backgroundColor="orange" px='8px' py='5px' >
                                                                    {question.userPosted.charAt(0).toUpperCase()}
                                                                </Avator>
                                                                <div>
                                                                        {question.userPosted}
                                                                    </div>
                                                            </Link>
                                                        </div>

                                                    </div>
                                            </div>
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && 
                                    <section >
                                        <h3>{question.noOfAnswers} Answers</h3>
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                    </section>
                                }
                                <section className='post-ans-container'>
                                    <h3> Your Answer </h3>
                                    <form onSubmit={(e)=> handlePostAnswer(e,question.answer.length)}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea> <br />
                                        <input type="Submit" className='post-ans-btn' value='post your answer'/>
                                    </form>
                                   <p>
                                    Browse other Question tagged{
                                        question.questionTags.map(tag =>(
                                                    <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                            
                                        )) 
                                    }or <Link to='/AskQuestion' style={{textDecoration:"none",color:"#009dff"}}>ask your own question.</Link>
                                   </p>
                                </section>

                        </div>
                ))
            }
            </>
           }
   </div>
  )
}

export default QuestionsDetails