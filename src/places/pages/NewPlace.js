import React, {useCallback} from 'react'
import Input from "../../shared/components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH  } from "../../shared/components/util/validators"
import "./NewPlace.css"

const NewPlace = () => {

    const titleInputHandler = useCallback((id, value, isValid)=>{


    }, [])

    const descriptionInputHandler = useCallback((id, value, isValid)=>{


    }, [])


    return <form className="place-form">
        <Input 
        id ="title"
        element="input" 
        type="text" 
        label="Title" 
        validators ={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title."
        onInput={titleInputHandler}>

        </Input>

        <Input 
        id ="description"
        element="textarea" 
        type="text" 
        label="Description" 
        validators ={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter a valid description (at lest 5 characters)."
        onInput={descriptionInputHandler}>
            
        </Input>

    </form>
}

export default NewPlace
