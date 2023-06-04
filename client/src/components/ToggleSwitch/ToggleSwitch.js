import { useState } from "react";
import axios from "../../utils/axiosConfig";
import { Switch, FormControlLabel, FormControl } from "@mui/material";

const ToggleSwitch = ({ product }) => {
  const [isFeatured, setIsFeatured] = useState(
    product.featured || false
  );

  const handleFeatured = async (e) => {
    console.log(isFeatured);
    await axios
      .put(`/product/featured/${product._id}`, {
        isFeatured: !isFeatured,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleToggleChange = (e) => {
    const { checked } = e.target;
    setIsFeatured(checked);
  };
  console.log(product);
  return (
    <FormControl component="fieldset" onClick={handleFeatured}>
      <FormControlLabel
        value="bottom"
        control={
          <Switch
            color="primary"
            onChange={handleToggleChange}
            checked={isFeatured}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={isFeatured ? "Featured" : "Make Featured"}
        labelPlacement="bottom"
      />
    </FormControl>
  );
};

export default ToggleSwitch;
