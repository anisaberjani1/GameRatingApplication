import { urlCategories } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO, categoryDTO } from "./category.model";

export default function EditCategory() {
  return (
    <>
      <EditEntity<categoryCreationDTO, categoryDTO>
        url={urlCategories}
        entityName="Categories"
        indexURL="/category"
      >
        {(entity, edit) => (
          <CategoryForm
            model={entity}
            onSubmit={async (value) => {
              //when the form is posted
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
