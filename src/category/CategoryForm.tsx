import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { categoryCreationDTO } from "./category.model";

export default function CategoryForm(props: categoryFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This field is required")
          .max(50, "Max length is 50 characters")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="name" displayName="Name" />
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/category">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface categoryFormProps {
  model: categoryCreationDTO;
  onSubmit(
    values: categoryCreationDTO,
    action: FormikHelpers<categoryCreationDTO>
  ): void;
}
