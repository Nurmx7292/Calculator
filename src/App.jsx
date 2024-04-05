import { useReducer, useState } from 'react'
import './App.css'

const ACTIONS = {
  CHOOSE_DIGIT: "choose_digit",
  CHOOSE_OPERAND: "choose_operand",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUAUTE: "evaluate"
}
function evaluate({currentOperand,previousOperand,operand}){
  let curr1 = parseFloat(currentOperand)
  let prev1 = parseFloat(previousOperand)
  if(isNaN(curr1)||isNaN(prev1)) return "";
  let calculation = "";
  switch(operand){
    case "+":
      calculation = prev1+curr1
      break
    case "-":
      calculation = prev1-curr1
      break
    case "*":
      calculation = curr1*prev1
      break
    case "/":
      calculation = prev1/curr1
      break
  }
  console.log(calculation.toString())
  return calculation.toString()
}

function reducer(state, {type,payload}){
  switch (type) {
    case ACTIONS.CHOOSE_DIGIT:
      console.log(state)
      if(payload=="."){
        if(state.currentOperand && (state.currentOperand.includes("."))){
            return {...state}
        }else if(!state.currentOperand){
          return {...state}
        }
        }
      if(payload=="0" && state.currentOperand=="0"){
        return {...state}
      }
      return {...state,currentOperand:`${state.currentOperand || ""}${payload}`}
    case ACTIONS.CHOOSE_OPERAND:
      if((state.currentOperand==null)&&(state.previousOperand==null)) return state;
      if(state.currentOperand==null) return {...state,operand:payload};
      if(state.previousOperand==null) return {...state,previousOperand:state.currentOperand, currentOperand:null,operand: payload}

      return {...state,previousOperand:evaluate(state),currentOperand:null,operand:payload}
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUAUTE:
      return {...state,previousOperand:null, operand: null, currentOperand: evaluate(state)}
    default:
      return state;
  }
}

function App() {


  const [{currentOperand,previousOperand,operand},dispatch] = useReducer(reducer,{})

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operand}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERAND, payload: "/"})}>/</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "1"})}>1</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "2"})}>2</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "3"})}>3</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERAND, payload: "*"})}>*</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "4"})}>4</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "5"})}>5</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "6"})}>6</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERAND, payload: "+"})}>+</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "7"})}>7</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "8"})}>8</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "9"})}>9</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERAND, payload: "-"})}>-</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "."})}>.</button>
      <button onClick={() => dispatch({type:ACTIONS.CHOOSE_DIGIT, payload: "0"})}>0</button>
      <button className='span-two' onClick={() => dispatch({type:ACTIONS.EVALUAUTE})}>=</button>
    </div>
  )
}

export default App
