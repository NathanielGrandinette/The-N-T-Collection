import { useState } from "react";
import axios from "../../utils/axiosConfig";
import { Switch, FormControlLabel, FormControl } from "@mui/material";

const ToggleSwitch = ({ product }) => {
  const [isFeatured, setIsFeatured] = useState(
    product.featured || false
  );

  const handleFeatured = async (e) => {
    await axios
      .put(`/product/featured/${product._id}`, {
        isFeatured: !isFeatured,
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  };

  const handleToggleChange = (e) => {
    const { checked } = e.target;
    setIsFeatured(checked);
  };

  return (
    <FormControl component="fieldset" onClick={handleFeatured}>
      <FormControlLabel
        value="bottom"
        control={
          <Switch
            color="info"
            onChange={handleToggleChange}
            checked={isFeatured}
            inputProps={{ "aria-label": "controlled" }}
            size="small"
          />
        }
        label={isFeatured ? "Featured" : "Unfeatured"}
        labelPlacement="bottom"
      />
    </FormControl>
  );
};

export default ToggleSwitch;
