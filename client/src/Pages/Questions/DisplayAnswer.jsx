import React from 'react'
import { Link ,useParams} from 'react-router-dom'
import moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import Avator from '../../components/Avator/Avator'
import { deleteAnswer  } from '../../actions/question'
const DisplayAnswer = ({question,handleShare}) => {
  const User = useSelector((state) => (state.currentUserReducer))
  const {id}=useParams()
  const dispatch= useDispatch()
  const handleDelete=(answerId,noOfAnswers) =>{
    dispatch(deleteAnswer(id,answerId,noOfAnswers-1))
  }
  return (
    <div>
      {question.answer.map((ans)=>(
        <div key={ans._id} className="display-ans">
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>Share</button>
              {User?.result?._id === ans?.userId && <button type="button" onClick={()=>handleDelete(ans._id,question.noOfAnswers)}>Delete</button>}
            </div>
            <div>
              <p>Answer {moment(ans.answeredOn).fromNow()}</p>
              <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                      <Avator backgroundColor="green" px='8px' py='5px' >
                            {ans.userAnswered.charAt(0).toUpperCase()}
                     </Avator>
                      <div>
                          {ans.userAnswered}
                      </div>
              </Link>             
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayAnswer
