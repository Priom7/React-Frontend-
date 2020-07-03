import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [user, setUser] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
        setUser(responseData.users);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      {user && (
        <div className="center">
          <Card
            style={{
              width: "100%",
              paddig: "10%",
              marginLeft: "2%",
              marginRight: "2%",
            }}
          >
            <Avatar style={{ alignContent: "center" }}></Avatar>
            <h3>User Name : {user.name}</h3>
            <h4>Total Shared Places : {user.places.length}</h4>
            <h4>Email : {user.email}</h4>
          </Card>
        </div>
      )}
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
