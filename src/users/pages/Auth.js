import React, { useState, useContext } from 'react'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'
import { useForm } from '../../shared/hooks/form-hook'

const Auth = () => {

  const auth = useContext (AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true)

    const [formState, inputHandler, setFormData] = useForm(
        
        {
            email : {
                value : '',
                isValid : false
            },

            password : {
                value : '',
                isValid : false
            }
        }, 
        false
        
);


const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


 const atuhSubmitHandler = event => {
     event.preventDefault();
     console.log(formState.inputs); // send data to backend
     auth.login()
 }

    return <Card className = "authentication">
            <h2>Login Required</h2>
            <hr></hr>
            <form onSubmit={atuhSubmitHandler}>

            {!isLoginMode && <Input
            id ="name"
            element="input" 
            type="text" 
            label="Your Name" 
            validators ={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a valid Name."
            onInput={inputHandler}>
            </Input>}

            <Input 
            id ="email"
            element="input" 
            type="email" 
            label="E-Mail" 
            validators ={[VALIDATOR_EMAIL()]}
            errorText="Please Enter a valid Email address."
            onInput={inputHandler}>

            </Input>

            <Input 
            id ="password"
            element="input" 
            type="password" 
            label="Password" 
            validators ={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter a valid password (at lest 5 characters)."
            onInput={inputHandler}>
            
        </Input>

        <Button type="submit" disabled = {!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>

        </form>

        <Button inverse onClick = {switchModeHandler}>
         Switch to {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
        </Card>
    


}

export default Auth
