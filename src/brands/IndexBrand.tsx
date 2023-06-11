import IndexEntity from "../utils/IndexEntity";
import { brandDTO } from "./brands.model";
import { urlBrands } from "../endpoints";

export default function IndexBrand() {
  return (
    <IndexEntity<brandDTO>
      url={urlBrands}
      createURL="brands/create"
      title="Brands"
      entityName="Brand"
    >
      {(brands, buttons) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {brands?.map((brand) => (
              <tr key={brand.id}>
                <td>{buttons(`brands/edit/${brand.id}`, brand.id)}</td>
                <td>{brand.name}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
