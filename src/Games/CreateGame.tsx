import { useEffect, useState } from "react";
import { categoryDTO } from "../category/category.model";
import { shopDTO } from "../shops/ShopForm.model";
import GameForm from "./GameForm";
import axios, { AxiosResponse } from "axios";
import { urlGames } from "../endpoints";
import { gameCreationDTO, gamesPostGetDTO } from "./games.model";
import Loading from "../utils/Loading";
import { convertGameToFormData } from "../utils/formDataUtils";
import { useHistory } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateGame() {
  const [nonSelectedCategories, setNonSelectedCategories] = useState<
    categoryDTO[]
  >([]);
  const [nonSelectedShops, setNonSelectedShops] = useState<shopDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlGames}/postget`)
      .then((response: AxiosResponse<gamesPostGetDTO>) => {
        setNonSelectedCategories(response.data.categories);
        setNonSelectedShops(response.data.shops);
        setLoading(false);
      });
  }, []);

  async function create(game: gameCreationDTO) {
    try {
      const formData = convertGameToFormData(game);
      const response = await axios({
        method: "post",
        url: urlGames,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      history.push(`/game/${response.data}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Create Game</h3>
      <DisplayErrors errors={errors} />
      {loading ? (
        <Loading />
      ) : (
        <GameForm
          model={{ title: "", inShops: false, description: "" }}
          onSubmit={async (values) => await create(values)}
          nonSelectedCategory={nonSelectedCategories}
          selectedCategory={[]}
          nonSelectedShops={nonSelectedShops}
          selectedShops={[]}
          selectedBrands={[]}
        />
      )}
    </>
  );
}
