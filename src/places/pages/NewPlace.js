import React, {useCallback, useReducer} from 'react'
import Input from "../../shared/components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH  } from "../../shared/components/util/validators"
import Button from "../../shared/components/FormElements/Button"
import "./NewPlace.css"


const formReducer = (state, action) => {
    switch (action.type){
        case 'INPUT_CHANGE':

            let formIsValid = true

            for (const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }

            return {
                ...state,
                inputs : {
                    ...state.inputs,
                    [action.inputId]: {
                        value : action.value,
                        isValid : action.isValid
                    }

                }, 

                isValid : formIsValid
            }

        default : 
            return state
    }
};

const NewPlace = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs : {
            title : {
                value : '',
                isValid : false
            },

            description : {
                value : '',
                isValid : false
            },

            address : {
                value : '',
                isValid : false
            }
        },
        isValid : false

    });

    const inputHandler = useCallback((id, value, isValid)=>{

        dispatch ({
             type : 'INPUT_CHANGE',
              value : value ,
               isValid : isValid,
                inputId : id 
            })
     }, [])

     const placeSubmitHandler = event => {
         event.preventDefault();
         console.log(formState.inputs); // send data to backend
     }


    return <form className="place-form" onSubmit ={placeSubmitHandler}>
        <Input 
        id ="title"
        element="input" 
        type="text" 
        label="Title" 
        validators ={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title."
        onInput={inputHandler}>

        </Input>

        <Input 
        id ="description"
        element="textarea" 
        type="text" 
        label="Description" 
        validators ={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter a valid description (at lest 5 characters)."
        onInput={inputHandler}>
            
        </Input>


        <Input 
        id ="address"
        element="input" 
        type="text" 
        label="Address" 
        validators ={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Address."
        onInput={inputHandler}>

        </Input>

        <Button type="submit" disabled = {!formState.isValid}>
            Add Place
        </Button>

    </form>
}

export default NewPlace
