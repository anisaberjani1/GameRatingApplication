import axios from "axios";
import ShopForm from "./ShopForm";
import { shopCreationFormDTO } from "./ShopForm.model";
import { urlShops } from "../endpoints";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateShop() {
  const history = useHistory();
  const[errors, setErrors] = useState<string[]>([]);

  async function create(shop: shopCreationFormDTO){
    try{
      await axios.post(urlShops, shop);
      history.push("/shops");

    }catch(error){
      if(error && error.response){
          setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Create Shop</h3>
      <DisplayErrors errors={errors}/>
      <ShopForm model={{name:''}} onSubmit={async values => await create(values)}/>
    </>
  );
}
