import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import CountUp from "react-countup";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import "./Users.css";

const Users = () => {
  const [isLoadedUsers, setIsLoadedUsers] = useState();
  const [userCount, setUserCount] = useState();
  const [placeCount, setPlaceCount] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );

        setIsLoadedUsers(responseData.users);
        setUserCount(responseData.userCount);
        setPlaceCount(responseData.placeCount);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && isLoadedUsers && userCount && placeCount && (
        <React.Fragment>
          <Card className="total_count">
            <h1>
              Total Users :{" "}
              <CountUp
                start={0}
                end={userCount}
                duration={2}
                separator=","
              ></CountUp>
            </h1>
            <h2>
              Total Shared Places :{" "}
              <CountUp
                start={0}
                end={placeCount}
                duration={2}
                separator=","
              ></CountUp>
            </h2>
          </Card>
          <UsersList items={isLoadedUsers}></UsersList>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Users;
