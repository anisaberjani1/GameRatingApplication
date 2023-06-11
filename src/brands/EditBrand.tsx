import { urlBrands } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertBrandToFormData } from "../utils/formDataUtils";
import BrandForm from "./BrandForm";
import { brandCreationDTO, brandDTO } from "./brands.model";

export default function EditBrand() {

  function transform(brand: brandDTO): brandCreationDTO{
    return{
      name: brand.name,
      pictureURL: brand.picture,
      description: brand.description,
      dateOfRelease: new Date(brand.dateOfRelease)
    }
  }

  return (
    <EditEntity<brandCreationDTO, brandDTO> 
      url={urlBrands} indexURL="/brands" entityName="Brand" 
      transformFormData={convertBrandToFormData} transform={transform}
    >
      {(entity, edit) => 
        <BrandForm model={entity} onSubmit={async values => await edit(values)}/>
      }

    </EditEntity>
  );
}
