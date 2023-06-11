import { urlShops } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { shopDTO } from "./ShopForm.model";

export default function IndexShops() {
  return (
    <IndexEntity<shopDTO>
      url={urlShops}
      createURL="shops/create"
      title="Shops"
      entityName="Shop"
    >
      {(entities, buttons) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {entities?.map((entity) => (
              <tr key={entity.id}>
                <td>{buttons(`shops/edit/${entity.id}`, entity.id)}</td>
                <td>{entity.name}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
