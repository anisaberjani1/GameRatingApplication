import { useEffect, useState } from "react";
import GamesList from "./GamesList";
import { landingPageDTO } from "./games.model";
import axios, { AxiosResponse } from "axios";
import { urlGames } from "../endpoints";
import AlertContext from "../utils/AlertContext";

export default function LandingPage() {
  const [games, setGames] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(urlGames).then((response: AxiosResponse<landingPageDTO>) => {
      setGames(response.data);
    });
  }

  return (
    <>
      <AlertContext.Provider
        value={() => {
          loadData();
        }}
      >
        <h3>Online</h3>
        <GamesList games={games.inShops} />

        <h3>Upcoming Releases</h3>
        <GamesList games={games.upcomingReleases} />
      </AlertContext.Provider>
    </>
  );
}
