import { urlShops } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import ShopForm from "./ShopForm";
import { shopCreationFormDTO, shopDTO } from "./ShopForm.model";

export default function EditShop() {
  return (
    <EditEntity<shopCreationFormDTO, shopDTO>
      url={urlShops}
      indexURL="/shops"
      entityName="Shop"
    >
      {(entity, edit) => (
        <ShopForm
          model={entity}
          onSubmit={async (values) => await edit(values)}
        />
      )}
    </EditEntity>
  );
}
