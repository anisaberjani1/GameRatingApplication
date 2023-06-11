import axios from "axios";
import CategoryForm from "./CategoryForm";
import { categoryCreationDTO } from "./category.model";
import { urlCategories } from "../endpoints";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateCategory() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(category: categoryCreationDTO) {
    try {
      await axios.post(urlCategories, category);
      history.push("/category");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Create Category</h3>
      <DisplayErrors errors={errors}/>
      <CategoryForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
