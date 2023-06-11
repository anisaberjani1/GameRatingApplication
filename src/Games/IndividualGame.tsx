import css from "./IndividualGame.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlGames } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import { gameDTO } from "./games.model";
import Authorized from "../auth/Authorize";

export default function IndividualGame(props: gameDTO) {
  const buildLink = () => `/game/${props.id}`;
  const customAlert = useContext(AlertContext);

  function deleteGame() {
    axios.delete(`${urlGames}/${props.id}`).then(() => {
      customAlert();
    });
  }

  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img alt="Poster" src={props.poster} />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <Authorized
        role="admin"
        authorized={
          <>
            <div>
              <Link
                style={{ marginRight: "1rem" }}
                className="btn btn-info"
                to={`/games/edit/${props.id}`}
              >
                Edit
              </Link>
              <Button
                onClick={() => customConfirm(() => deleteGame())}
                className="btn btn-danger"
              >
                Delete
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}
