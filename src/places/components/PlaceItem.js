import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExploreIcon from "@material-ui/icons/Explore";
import TocIcon from "@material-ui/icons/Toc";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    // send delete request to backend

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__model-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to proceed and delete this place? Please note
          that this can't be undone thereafter.
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverLay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>
              <TocIcon className="place-item_icons"></TocIcon> {props.title}
            </h2>

            <h4>
              <LocationOnIcon className="place-item_icons"></LocationOnIcon>{" "}
              {props.address}
            </h4>
            <p>
              <DescriptionIcon className="place-item_icons"></DescriptionIcon>
              {props.description}
            </p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              <ExploreIcon className="place-item_icons"></ExploreIcon>
              VIEW ON MAP
            </Button>

            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>
                <EditIcon className="place-item_icons"></EditIcon> EDIT
              </Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                <DeleteIcon className="place-item_icons"></DeleteIcon>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
