import React from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'


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
        title: 'Empire afsafae State Building',
        description : 'One Of the Most Famous Sky Scrapers in the world',
        imageUrl :'https://untappedcities.com/wp-content/uploads/2015/07/Flatiron-Building-Secrets-Roof-Basement-Elevator-Sonny-Atis-GFP-NYC_5.jpg',
        address : '20 W 34th St, New York, NY 10001, United States',
        location : {
            lat: 23.815103, lng: 90.425538
        },
        creator: 'u2'
    }
]


const UserPlaces = props => {

    const userId = useParams().userId

    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

    return <PlaceList items={loadedPlaces}></PlaceList>
}

export default UserPlaces
