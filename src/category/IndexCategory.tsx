import { categoryDTO } from "./category.model";
import { urlCategories } from "../endpoints";

import IndexEntity from "../utils/IndexEntity";

export default function IndexCategory() {
  return (
    <>
      <IndexEntity<categoryDTO>
        url={urlCategories}
        createURL="/category/create"
        title="Categories"
        entityName="Category"
      >
        {(categories, buttons) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>
                    {buttons(`category/edit/${category.id}`, category.id)}
                  </td>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
