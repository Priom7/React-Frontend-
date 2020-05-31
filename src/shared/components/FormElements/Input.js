import React, { useReducer, useEffect } from 'react'
import { validate } from '../util/validators'
import './Input.css'

const inputReducer = (state, action)=>{
    switch(action.type){
        case 'CHANGE':
            return {
                //copies old states and all key value pairs and updates
                ...state,
                value : action.val,
                isValid: validate(action.val, action.validators)
            }
            case 'TOUCH':
                return {
                    //copies old states and all key value pairs and updates
                    ...state,
                    isTouched : true
                   
                }
        default:
            return state
    }

}


const Input = props => {
//more complex state updating logic 
    const [inputState, dispatch] = useReducer(inputReducer,
         {value : props.value || '', 
         isValid: props.valid || false,
         isTouched : false
        });

const {id, onInput} = props
const {value, isValid} = inputState
//runs whenever  changes
useEffect(()=> {
    onInput(id, value, isValid)
}, [id, value, isValid, onInput])

    const changeHandeler = event => {

        dispatch({type:'CHANGE', 
        val: event.target.value, 
        validators : props.validators
    })

    }

    const touchHandeler = ()=>{
        dispatch({
            type : 'TOUCH'
        })
    }


    const element = props.element === 'input' ?(
     <input
     id={props.id} 
     type={props.type} 
     placeholder={props.placeholder} 
     onChange ={changeHandeler}
     onBlur={touchHandeler}
     value = {inputState.value}/>
      ) : (
      <textarea
      id ={props.id} 
      rows={props.rows|| 3} 
      onChange={changeHandeler}
      onBlur={touchHandeler}
      value = {inputState.value}/>
      )


    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched  && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input
