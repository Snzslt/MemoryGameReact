
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages= [
  {"src":"/images/pic1.jpeg", matched: false},
  {"src":"/images/pic2.png", matched: false},
  {"src":"/images/pic3.webp", matched: false},
  {"src":"/images/pic4.jpeg", matched: false},
  {"src":"/images/pic5.jpeg", matched: false},
  {"src":"/images/pic6.jpeg", matched: false},

]





function App() {

  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  const [disabled, setDisabled]= useState(false)
  const [turn,setTurn] =useState(0)




//shuffle cards
const shuffleCards =()=>{
  const shuffleCards=[...cardImages,...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id:Math.random()}))
  setchoiceOne(null)
  setchoiceTwo(null)
  setCards(shuffleCards)
  setTurns(0)
}


//handle a choice
const handleChoice = (card) => {
  choiceOne ? setchoiceTwo(card) : setchoiceOne (card)
 
}
//reset choices & increase turn 
const resetTurn = () =>{
  setchoiceOne(null)
  setchoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1 )
  setDisabled(false)
}

//start the gae authomatically
useEffect(()=>{
  shuffleCards()
},[])
//compare 2 selected cards
useEffect (() => {
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src == choiceTwo.src){
      setCards(prevCards => {
        //prev.................
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return{...card,matched:true}

          }
          else{
            return card
          }
        })
      })

      console.log('Those cards are match')
      resetTurn()
    }
    else{
      
      console.log('Those cards dont match')
      setTimeout(()=>resetTurn(),1000)
    }
  }
  
},[choiceOne,choiceTwo])



  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={shuffleCards}>New Game</button>
     <div className='card-grid'>
       {cards.map(card => (
         <SingleCard key={card.id}
          card={card} 
          handleChoice={handleChoice}
          flipped = {card === choiceOne || card === choiceTwo || card.matched }
          disabled = {disabled}
          />
       ))}
       </div>
       <p>Turns:{turns}</p>
    </div>
  );
}



export default App;
