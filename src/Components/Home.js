import React from "react";
import ProjectList from "./ProjectList";
import useLocalStorage from "../Hooks/useLocalStorage";
import useApi from "../Hooks/useApi";
import useLocalJson from "../Hooks/useLocalJson";

export default function Home() {
  const user = useLocalStorage.GetUser();

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  const HandleSave = (e) => {
    e.preventDefault();
    useApi.UpdateUser();
  };

  return (
    <div id="home">
      <h1>
        Liste des Projets de{" "}
        {user != false ? (
          <strong style={{ color: "red" }}>{user.username}</strong>
        ) : (
          ""
        )}
      </h1>
      <ProjectList
        props={JSON.parse(user.todo).projects}
        tags={
          useLocalJson.GetTags()[0].name != null
            ? useLocalJson.GetTags()[0].name
            : "Default"
        }
      />
      <button
        onClick={HandleSave}
        className="home_buttons save_button"
        type="submit"
        value="Save"
      >
        Save
      </button>

      <button
        onClick={handleLogout}
        className="home_buttons logout_button"
        type="submit"
        value="Logout"
      >
        Logout
      </button>
    </div>
  );
}