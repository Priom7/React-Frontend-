import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import PlaceIcon from "@material-ui/icons/Place";
import "./UserItem.css";

const UserItem = (props) => {
  let placesCount = !!props.placeCount;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.name}
            ></Avatar>
          </div>
          <div className="user-item__info">
            <h2>
              {props.name}{" "}
              <sup
                className={` ${
                  placesCount ? "user-item_active" : "user-item_disabled"
                }`}
              ></sup>{" "}
            </h2>
            <h3>
              <PlaceIcon className="user-item_icons"></PlaceIcon>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
