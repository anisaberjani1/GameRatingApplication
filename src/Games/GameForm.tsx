import { Form, Formik, FormikHelpers } from "formik";
import { gameCreationDTO } from "./games.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, {
  multipleSelectorModel,
} from "../forms/MultipleSelector";
import { useState } from "react";
import { categoryDTO } from "../category/category.model";
import { shopDTO } from "../shops/ShopForm.model";
import TypeAheadBrands from "../forms/TypeAheadBrands";
import { brandsDTO } from "../brands/brands.model";

export default function GameForm(props: gameFormProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    mapToModel(props.selectedCategory)
  );
  const [nonSelectedCategory, setNonSelectedCategory] = useState(
    mapToModel(props.nonSelectedCategory)
  );

  const [selectedShops, setSelectedShops] = useState(
    mapToModel(props.selectedShops)
  );
  const [nonSelectedShops, setNonSelectedShops] = useState(
    mapToModel(props.nonSelectedShops)
  );

  const [selectedBrands, setSelectedBrands] = useState(props.selectedBrands);

  function mapToModel(
    items: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.categoriesIds = selectedCategory.map((item) => item.key);
        values.shopsIds = selectedShops.map((item) => item.key);
        values.brands = selectedBrands;
        props.onSubmit(values, actions);
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("This field is required")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField displayName="Title" field="title" />
          <CheckboxField displayName="In Shops" field="inShops" />
          <TextField displayName="Description" field="description" />
          <DateField displayName="ReleaseDate" field="releaseDate" />
          <ImageField
            displayName="Poster"
            field="poster"
            imageURL={props.model.posterURL}
          />

          <MultipleSelector
            displayName="Category"
            nonSelected={nonSelectedCategory}
            selected={selectedCategory}
            onChange={(selected, nonSelected) => {
              setSelectedCategory(selected);
              setNonSelectedCategory(nonSelected);
            }}
          />

          <MultipleSelector
            displayName="Shops"
            nonSelected={nonSelectedShops}
            selected={selectedShops}
            onChange={(selected, nonSelected) => {
              setSelectedShops(selected);
              setNonSelectedShops(nonSelected);
            }}
          />
          <TypeAheadBrands
            displayName="Brands"
            brands={selectedBrands}
            onAdd={(brands) => {
              setSelectedBrands(brands);
            }}
            onRemove={(brand) => {
              const brands = selectedBrands.filter((x) => x !== brand);
              setSelectedBrands(brands);
            }}
            listUI={(brand: brandsDTO) => (
              <>
                {brand.name} /
                <input
                  placeholder="Company"
                  type="text"
                  value={brand.company}
                  onChange={(e) => {
                    const index = selectedBrands.findIndex(
                      (x) => x.id === brand.id
                    );

                    const brands = [...selectedBrands];
                    brands[index].company = e.currentTarget.value;
                    setSelectedBrands(brands);
                  }}
                />
              </>
            )}
          />

          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface gameFormProps {
  model: gameCreationDTO;
  onSubmit(
    values: gameCreationDTO,
    actions: FormikHelpers<gameCreationDTO>
  ): void;
  selectedCategory: categoryDTO[];
  nonSelectedCategory: categoryDTO[];
  selectedShops: shopDTO[];
  nonSelectedShops: shopDTO[];
  selectedBrands: brandsDTO[];
}
