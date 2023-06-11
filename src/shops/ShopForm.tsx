import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { shopCreationFormDTO } from "./ShopForm.model";
import * as Yup from "yup";
import MapField from "../forms/MapField";
import coordinateDTO from "../utils/coordinates.model";

export default function ShopForm(props: shopForm) {
  function transformCoordinates(): coordinateDTO[] | undefined {
    if (props.model.latitude && props.model.longitude) {
      const response: coordinateDTO = {
        lat: props.model.latitude,
        lng: props.model.longitude,
      };
      return [response];
    }

    return undefined;
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This field is requried")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Name" field="name" />

          <div style={{ marginBottom: "1rem" }}>
            <MapField
              latField="latidute"
              lngField="longitude"
              coordinates={transformCoordinates()}
            />
          </div>

          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>

          <Link className="btn btn-secondary" to="/shops">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface shopForm {
  model: shopCreationFormDTO;
  onSubmit(
    values: shopCreationFormDTO,
    actions: FormikHelpers<shopCreationFormDTO>
  ): void;
}
