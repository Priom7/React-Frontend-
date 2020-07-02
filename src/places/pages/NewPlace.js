import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./NewPlace.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },

      description: {
        value: "",
        isValid: false,
      },

      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const createHistory = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // send data to

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      createHistory.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onCLear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid Title."
          onInput={inputHandler}
        ></Input>

        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a valid description (at lest 5 characters)."
          onInput={inputHandler}
        ></Input>

        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid Address."
          onInput={inputHandler}
        ></Input>

        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image..."
        ></ImageUpload>

        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
