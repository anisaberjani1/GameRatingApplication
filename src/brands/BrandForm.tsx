import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { brandCreationDTO } from "./brands.model";
import * as Yup from "yup";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkdownField from "../forms/MarkdownField";

export default function BrandForm(props: brandFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This field is required")
          .firstLetterUppercase(),
        dateOfRelease: Yup.date().nullable().required("This field is required"),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Name" field="name" />
          <DateField displayName="Date of Release" field="dateOfRelease" />
          <ImageField
            displayName="Picture"
            field="picture"
            imageURL={props.model.pictureURL}
          />
          <MarkdownField displayName="Description" field="description"/>

          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link to="/brands" className="btn btn-secondary">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface brandFormProps {
  model: brandCreationDTO;
  onSubmit(
    values: brandCreationDTO,
    action: FormikHelpers<brandCreationDTO>
  ): void;
}
