import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Answer.css'
const Answer = (props) => {
    const [loaded,isLoaded]=useState(false)
    const [userMessage,setUserMessage] =useState('')
    const [relatedQuestion,setRelatedQuestion] = useState('')
    const [knowledgeGraph,setKnowledgeGraph]=useState('')
    const [organicResult,setOrganicResult]=useState('')
    const [knowledgeDisplay,setKnowledgeDisplay]=useState(true)
    const [relatedDisplay,setRelatedDisplay]=useState(false)
    const [organicDisplay,setOrganicDisplay]=useState(false)
    const [stackLinks,setStackLinks] =useState('')
    const moreButton = () =>{
      setRelatedDisplay(!relatedDisplay)
      setKnowledgeDisplay(!knowledgeDisplay)
    }

    const websiteButton = () =>{
        setOrganicDisplay(!organicDisplay)
    }
    const getAnswer = async(message) =>{
      const {data} =await axios.post('https://stack-over-flow-45.herokuapp.com/chatbot/',{message})
      setRelatedQuestion(data['related_questions'])
      setKnowledgeGraph(data['knowledge_graph'])
      setOrganicResult(data['organic_results'])
      //stack link
      isLoaded(true)
      const url =`https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${message}&notice=False&site=stackoverflow`;
      const stackData=await  axios.get(url)
  
      const links = stackData.data.items
    
      const sortedLinks  = links.sort((a,b) => {
                  return b.score - a.score
      })
      setStackLinks([...sortedLinks])          
     
    }

    useEffect(()=>{
        isLoaded(false)
        const {messages} = props.state
        const filteredMessages = messages.filter(m =>  m.type=='user')
        setTimeout(() => {
          setUserMessage([...filteredMessages]);
        },2000);
    },[])

    useEffect(()=>{
      if(userMessage.length){
        const message = userMessage[userMessage.length-1].message;
        getAnswer(message)
      }
    },[userMessage])
  

  return (
    <div className='answer-container' >
      {loaded?
       <div className="answer-content">
        
        {knowledgeDisplay && 
        <div className='knowledge-graph'>
           <p> {knowledgeGraph?.description !=null? knowledgeGraph?.description : relatedQuestion[0].snippet}</p> 
        </div> 
          }
          {
            relatedDisplay ? <div className='related-content'> 
              {relatedQuestion?.length &&
              <ul>
                {relatedQuestion?.map(q =>(
                 q.snippet && <li key={q.link}> {q.snippet} </li>
                ))}
              </ul>
              } 
            </div> :''
          }

      <div className='answer-buttons'>
           {relatedQuestion && <button className='answer-btn'  onClick={moreButton}>{relatedDisplay ?'LESS' : 'MORE'}</button> }
           {organicResult && <button className='answer-btn' onClick={websiteButton}>{organicDisplay ? 'HIDE' :'WEBSITES'}</button> }
           {stackLinks.length ? <a className='answer-btn' href={stackLinks[0].link} target='blank'>StackOverflow</a>:''}
       </div>
       <div className="stack-link">
      
       </div>
          {organicDisplay &&
       <div className='answer-websites'>
            {organicResult.map(l => (
              <div className='organic-links'>
                  <a href={l.link} key={l.link} target='_blank'>{l.snippet.slice(0,90)}</a>
              </div>
            ))}
       </div>
}
       </div>

        :
        <div className='answer-loading'>
          <i className="fa-solid fa-ellipsis fa-beat-fade"></i>
        </div>
        }

  
    </div>
  )
}


export default Answer