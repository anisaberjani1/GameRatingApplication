import IndividualGame from "./IndividualGame";
import { gameDTO } from "./games.model";
import css from "./GamesList.module.css";
import GenericList from "../utils/GenericList";

export default function GamesList(props: gamesListProps) {
  return (
    <GenericList list={props.games}>
      <div className={css.div}>
        {props.games?.map((game) => (
          <IndividualGame {...game} key={game.id} />
        ))}
      </div>
    </GenericList>
  );
}

interface gamesListProps {
  games?: gameDTO[];
}
