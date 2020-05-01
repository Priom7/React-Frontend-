import React, { useState } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import Map from "../../shared/components/UIElements/Map"
import Modal from '../../shared/components/UIElements/Modal'
import './PlaceItem.css'



const PlaceItem = props => {

    const [showMap, setShowMap] = useState(false)

    const openMapHandeler = () => setShowMap(true)
    const closeMapHandeler = () => setShowMap(false)

    return(
    <React.Fragment>


        <Modal 
            show={showMap} 
            onCancel={closeMapHandeler} 
            header={props.address} 
            contentClass="place-item__model-content"
            footerClass="place-item__modal-actions"
            footer={
                <Button onClick={closeMapHandeler}>CLOSE</Button>}>
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}></Map>
                </div>
        </Modal>




     <li className='place-item'>
         
        <Card className="place-item__content">
        <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
        </div>
        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h2>{props.address}</h2>
            <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
            <Button inverse onClick={openMapHandeler}>VIEW ON MAP</Button>
            <Button to = {`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
        </div>
        </Card>

    </li>


    </React.Fragment>
    )
}

export default PlaceItem
