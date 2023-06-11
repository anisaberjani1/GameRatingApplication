import { useState } from "react";
import BrandForm from "./BrandForm";
import { brandCreationDTO } from "./brands.model";
import DisplayErrors from "../utils/DisplayErrors";
import { convertBrandToFormData } from "../utils/formDataUtils";
import axios from "axios";
import { urlBrands } from "../endpoints";
import { useHistory } from "react-router-dom";

export default function CreateBrand() {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  async function create(brand: brandCreationDTO) {
    try {
      const formData = convertBrandToFormData(brand);

      await axios({
        method: 'post',
        url: urlBrands,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push("/brands");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Create Brand</h3>
      <DisplayErrors errors={errors} />
      <BrandForm
        model={{ name: "", dateOfRelease: undefined }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
}
