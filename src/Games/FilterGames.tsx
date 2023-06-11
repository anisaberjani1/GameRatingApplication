import { useEffect, useState } from "react";
import { categoryDTO } from "../category/category.model";
import { gameDTO } from "./games.model";
import { useHistory, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { urlCategories, urlGames } from "../endpoints";
import { Field, Form, Formik } from "formik";
import Button from "../utils/Button";
import GamesList from "./GamesList";
import Pagination from "../utils/Pagination";

export default function FilterGames() {
  const initialValues: filterGamesForm = {
    title: "",
    categoryId: 0,
    upcomingReleases: false,
    inShops: false,
    page: 1,
    recordsPerPage: 10,
  };

  const [categories, setCategories] = useState<categoryDTO[]>([]);
  const [games, setGames] = useState<gameDTO[]>([]);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);

  useEffect(() => {
    axios
      .get(`${urlCategories}/all`)
      .then((response: AxiosResponse<categoryDTO[]>) => {
        setCategories(response.data);
      });
  }, []);

  useEffect(() => {
    if (query.get("title")) {
      initialValues.title = query.get("title")!;
    }

    if (query.get("categoryId")) {
      initialValues.categoryId = parseInt(query.get("categoryId")!, 10);
    }

    if (query.get("upcomingReleases")) {
      initialValues.upcomingReleases = true;
    }

    if (query.get("inShops")) {
      initialValues.inShops = true;
    }

    if (query.get("page")) {
      initialValues.page = parseInt(query.get("page")!, 10);
    }

    searchGames(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchGames(values: filterGamesForm) {
    modifyURL(values);
    axios
      .get(`${urlGames}/filter`, { params: values })
      .then((response: AxiosResponse<gameDTO[]>) => {
        const records = parseInt(response.headers["totalamountofrecords"], 10);
        setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
        setGames(response.data);
      });
  }

  function modifyURL(values: filterGamesForm) {
    const queryStrings: string[] = [];

    if (values.title) {
      queryStrings.push(`title=${values.title}`);
    }

    if (values.categoryId !== 0) {
      queryStrings.push(`categoryId=${values.categoryId}`);
    }

    if (values.upcomingReleases) {
      queryStrings.push(`upcomingReleases=${values.upcomingReleases}`);
    }

    if (values.inShops) {
      queryStrings.push(`inShops=${values.inShops}`);
    }

    queryStrings.push(`page=${values.page}`);
    history.push(`/games/filter?${queryStrings.join("&")}`);
  }

  return (
    <>
      <h3>Filter Games</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.page = 1;
          searchGames(values);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="row gx-3 align-items-center mb-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title of the game"
                    {...formikProps.getFieldProps("title")}
                  />
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    {...formikProps.getFieldProps("categoryId")}
                  >
                    <option value="0">--Choose a category--</option>
                    {categories.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="upcomingReleases"
                      name="upcomingReleases"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="upcomingReleases"
                    >
                      Upcoming Releases
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="inShops"
                      name="inShops"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="inShops">
                      In Shops
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <Button
                    className="btn btn-primary"
                    onClick={() => formikProps.submitForm()}
                  >
                    Filter
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchGames(initialValues);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>

            <GamesList games={games} />
            <Pagination
              totalAmountOfPages={totalAmountOfPages}
              currentPage={formikProps.values.page}
              onChange={(newPage) => {
                formikProps.values.page = newPage;
                searchGames(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

interface filterGamesForm {
  title: string;
  categoryId: number;
  upcomingReleases: boolean;
  inShops: boolean;
  page: number;
  recordsPerPage: number;
}
