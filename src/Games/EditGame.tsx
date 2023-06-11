import { useEffect, useState } from "react";
import GameForm from "./GameForm";
import { urlGames } from "../endpoints";
import axios, { AxiosResponse } from "axios";
import { useHistory, useParams } from "react-router-dom";
import { gameCreationDTO, gamePutGetDTO } from "./games.model";
import { convertGameToFormData } from "../utils/formDataUtils";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";

export default function EditGame() {
  const { id }: any = useParams();
  const [game, setGame] = useState<gameCreationDTO>();
  const [gamePutGet, setGamePutGet] = useState<gamePutGetDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlGames}/PutGet/${id}`)
        .then((response: AxiosResponse<gamePutGetDTO>) => {
          const model: gameCreationDTO = {
            title: response.data.game.title,
            inShops: response.data.game.inShops,
            description: response.data.game.description,
            posterURL: response.data.game.poster,
            releaseDate: new Date(response.data.game.releaseDate),
          };

          setGame(model);
          setGamePutGet(response.data);
        });
  }, [id]);

  async function edit(gameToEdit: gameCreationDTO) {
    try {
      const formData = convertGameToFormData(gameToEdit);
      await axios({
        method: "put",
        url: `${urlGames}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push(`/game/${id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Edit Game</h3>
      <DisplayErrors errors={errors} />
      {game && gamePutGet ? (
        <GameForm
          model={game}
          onSubmit={async (values) => await edit(values)}
          nonSelectedCategory={gamePutGet.nonSelectedCategories}
          selectedCategory={gamePutGet.selectedCategories}
          nonSelectedShops={gamePutGet.nonSelectedShops}
          selectedShops={gamePutGet.selectedShops}
          selectedBrands={gamePutGet.brands}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
