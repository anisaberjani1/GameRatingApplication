import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlGames, urlRatings } from "../endpoints";
import { Link, useParams } from "react-router-dom";
import { gameDTO } from "./games.model";
import Loading from "../utils/Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Map from "../utils/Map";
import coordinateDTO from "../utils/coordinates.model";
import Ratings from "../utils/Ratings";
import Swal from "sweetalert2";

export default function GameDetails() {
  const { id }: any = useParams();
  const [game, setGame] = useState<gameDTO>();

  useEffect(() => {
    axios.get(`${urlGames}/${id}`).then((response: AxiosResponse<gameDTO>) => {
      response.data.releaseDate = new Date(response.data.releaseDate);
      setGame(response.data);
    });
  }, [id]);

  function transformCoordinates(): coordinateDTO[] {
    if (game?.shops) {
      const coordinates = game.shops.map((shop) => {
        return {
          lat: shop.latitude,
          lng: shop.longitude,
          name: shop.name,
        } as coordinateDTO;
      });

      return coordinates;
    }
    return [];
  }

  function handleRate(rate: number) {
    axios.post(urlRatings, { rating: rate, gameId: id }).then(() => {
      Swal.fire({ icon: "success", title: "Rating received" });
    });
  }

  return game ? (
    <div>
      <h2>
        {game.title} ({game.releaseDate.getFullYear()})
      </h2>
      {game.categories?.map((category) => (
        <Link
          key={category.id}
          style={{ marginRight: "5px" }}
          className="btn btn-primary btn-sm rounded-pill"
          to={`/games/filter?categoryId=${category.id}`}
        >
          {category.name}
        </Link>
      ))}
      | {game.releaseDate.toDateString()}
      | Your vote:
      <Ratings
        maximumValue={5}
        selectedValue={game.userVote}
        onChange={handleRate}
      />{" "}
      | Average Vote: {game.averageVote}
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <span style={{ display: "inline-block", marginRight: "1rem" }}>
          <img
            src={game.poster}
            style={{ width: "225px", height: "315px" }}
            alt="poster"
          />
        </span>
      </div>
      {game.description ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Description</h3>
          <div>
            <ReactMarkdown>{game.description}</ReactMarkdown>
          </div>
        </div>
      ) : null}
      {game.brands && game.brands.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Brands</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {game.brands?.map((brand) => (
              <div key={brand.id} style={{ marginBottom: "2px" }}>
                <img
                  alt="pic"
                  src={brand.picture}
                  style={{ width: "50px", verticalAlign: "middle" }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "200px",
                    marginLeft: "1rem",
                  }}
                >
                  {brand.name}
                </span>
                <span style={{ display: "inline-block", width: "45px" }}>
                  ...
                </span>
                <span>{brand.company}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {game.shops && game.shops.length > 0 ? (
        <div>
          <h2>In Stores</h2>
          <Map coordinates={transformCoordinates()} readOnly={true} />
        </div>
      ) : null}
    </div>
  ) : (
    <Loading />
  );
}
