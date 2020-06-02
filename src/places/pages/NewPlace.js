import React from 'react'
import Input from "../../shared/components/FormElements/Input"
import  { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH  } from "../../shared/components/util/validators"
import Button from "../../shared/components/FormElements/Button"
import "./NewPlace.css"




const NewPlace = () => {

    const [formState, inputHandler] = useForm(
        
            {
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
            false
            
    );

    

    

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
