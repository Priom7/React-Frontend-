import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from "../../shared/components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH  } from "../../shared/components/util/validators"
import Button from "../../shared/components/FormElements/Button"
import { useForm } from '../../shared/hooks/form-hook'
import Card from "../../shared/components/UIElements/Card"


const DUMMY_PLACES = [
    {
        id:'p1',
        title: 'Empire State Building',
        description : 'One Of the Most Famous Sky Scrapers in the world',
        imageUrl :'https://i.ytimg.com/vi/nVzKzoFJkQo/maxresdefault.jpg',
        address : '20 W 34th St, New York, NY 10001, United States',
        location : {
            lat: -34.397, lng: 150.644
        },
        creator : 'u1'
    },

    {
        id:'p2',
        title: 'Empire afdaf State Building',
        description : 'One Of the Most Famous Sky Scrapers in the world',
        imageUrl :'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address : '20 W 34th St, New York, NY 10001, United States',
        location : {
            lat: 23.815103, lng: 90.425538
        },
        creator: 'u2'
    }
]


const UpdatePlace = () =>{

    const placeId = useParams().placeId;
    const [isLoading, setIsLoading] = useState(true);


    const [formState, inputHandler, setFormData] = useForm({
        title : {
            value : '',
            isValid : false
        },
        description : {
            value : '',
            isValid : false
        }
    },
     false
    );

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    useEffect(()=>{

        if(identifiedPlace){

            setFormData ({
                title : {
                    value : identifiedPlace.title,
                    isValid : true
                },
                description : {
                    value : identifiedPlace.description,
                    isValid : true
                }
        
            }, true
            )

        }

        setIsLoading(false)

    }, [setFormData, identifiedPlace])



    const placeUpdateSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs);
    }
    
        if(!identifiedPlace){
            return (
                <div className="center">
                <Card>
                    <h2>No Place Found</h2>
                </Card>
                </div>
            )
        }

        if(isLoading){
            return (
                <div className="center">
                    <h2>loading</h2>
                </div>
            )
        }


        return <form className="place-form" onSubmit= {placeUpdateSubmitHandler}>
        <Input 
        id ="title"
        element="input" 
        type="text" 
        label="Title" 
        validators ={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title."
        onInput = {inputHandler}
        initialValue = {formState.inputs.title.value}
        initialValid = {formState.inputs.title.isValid}
        >

        </Input>

        <Input 
        id ="description"
        element="textarea" 
        type="text" 
        label="Description" 
        validators ={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter a valid description (at lest 5 characters)."
        onInput = {inputHandler}
        initialValue = {formState.inputs.description.value}
        initialValid = {formState.inputs.title.isValid}
        >
            
        </Input>

        <Button type="submit" disabled = {!formState.isValid}>
            Update Place
        </Button>

    </form>


}

export default UpdatePlace
