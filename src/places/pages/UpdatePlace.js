import React from 'react'
import { useParams } from 'react-router-dom'
import Input from "../../shared/components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH  } from "../../shared/components/util/validators"
import Button from "../../shared/components/FormElements/Button"


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
        title: 'Empire State Building',
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
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)
    
        if(!identifiedPlace){
            return (
                <div className="center">
                    <h2>No Place Found</h2>
                </div>
            )
        }


       return <form className="place-form" >
        <Input 
        id ="title"
        element="input" 
        type="text" 
        label="Title" 
        validators ={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a valid Title."
        onInput = {() => {}}
        value = {identifiedPlace.title}
        valid = {true}
        >

        </Input>

        <Input 
        id ="description"
        element="textarea" 
        type="text" 
        label="Description" 
        validators ={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Enter a valid description (at lest 5 characters)."
        onInput = {() => {}}
        value = {identifiedPlace.description}
        valid = {true}
        >
            
        </Input>

        <Button type="submit" disabled = {true}>
            Update Place
        </Button>

    </form>


}

export default UpdatePlace
