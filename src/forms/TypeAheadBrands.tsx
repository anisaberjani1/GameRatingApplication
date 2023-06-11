import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { brandsDTO } from "../brands/brands.model";
import { ReactElement, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlBrands } from "../endpoints";

export default function TypeAheadBrands(props: typeAheadBrandsProps) {
  const [brands, setBrands] = useState<brandsDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selected: brandsDTO[] = [];

  const [draggedElement, setDraggedElement] = useState<brandsDTO | undefined>(
    undefined
  );

  function handleSearch(query: string) {
    setIsLoading(true);

    axios
      .get(`${urlBrands}/searchByName/${query}`)
      .then((response: AxiosResponse<brandsDTO[]>) => {
        setBrands(response.data);
        setIsLoading(false);
      });
  }

  function handleDragStart(brand: brandsDTO) {
    setDraggedElement(brand);
  }

  function handleDragOver(brand: brandsDTO) {
    if (!draggedElement) {
      return;
    }

    if (brand.id !== draggedElement.id) {
      const draggedElementIndex = props.brands.findIndex(
        (x) => x.id === draggedElement.id
      );
      const brandIndex = props.brands.findIndex((x) => x.id === brand.id);

      const brands = [...props.brands];
      brands[brandIndex] = draggedElement;
      brands[draggedElementIndex] = brand;
      props.onAdd(brands);
    }
  }

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(brands) => {
          if (props.brands.findIndex((x) => x.id === brands[0].id) === -1) {
            brands[0].company = "";
            props.onAdd([...props.brands, brands[0]]);
          }
        }}
        options={brands}
        labelKey={(brand) => brand.name}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={handleSearch}
        placeholder="Write the name of the brand..."
        minLength={1}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(brand) => (
          <>
            <img
              alt="brand"
              src={brand.picture}
              style={{ height: "64px", marginRight: "10px", width: "64px" }}
            />
            <span>{brand.name}</span>
          </>
        )}
      />

      <ul className="list-group">
        {props.brands.map((brand) => (
          <li
            key={brand.id}
            draggable={true}
            onDragStart={() => handleDragStart(brand)}
            onDragOver={() => handleDragOver(brand)}
            className="list-group-item list-group-item-action"
          >
            {props.listUI(brand)}
            <span
              className="badge badge-primary badge-pill pointer text-dark"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(brand)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface typeAheadBrandsProps {
  displayName: string;
  brands: brandsDTO[];
  onAdd(brands: brandsDTO[]): void;
  onRemove(brand: brandsDTO): void;
  listUI(brand: brandsDTO): ReactElement;
}
