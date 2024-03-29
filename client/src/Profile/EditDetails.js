import React, { useState, useContext, useEffect } from "react";
import TogglePasswordIcon from "../components/TooglePasswordIcon";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axiosConfig";
import { TextField, Box, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { validationSchema } from "../utils/formSchema";

const initialFormState = {
  name: "",
  email: "",
  currPassword: "",
  password: "",
  confirmPassword: "",
  address: "",
  addressLine1: "",
  city: "",
  state: "",
  zip: "",
  error: "",
};

const EditDetails = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userForm, setUserForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/user/${user._id}`)
      .then((res) => {
        const { address } = res.data;
        setUserForm({ ...res.data, ...address });
      })

      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong.");
      });
  }, [user._id]);

  const handleErrors = (err) => {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 400 || status === 422) {
        setUserForm((prevState) => ({
          ...prevState,
          error: data.error || "Something went wrong.",
        }));
      } else if (status === 500) {
        toast.error("Something went wrong...");
      } else {
        setUserForm((prevState) => ({
          ...prevState,
          error: data.error || err.response.statusText,
        }));
      }
    } else {
      setUserForm((prevState) => ({
        ...prevState,
        error: "Something went wrong.",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    validationSchema
      .validate(userForm, { abortEarly: false })
      .then(() => {
        axios
          .patch(`/user/edit/${user._id}`, userForm)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Profile Updated.");
              setUserForm((prevState) => ({
                ...prevState,
                password: "",
                confirmPassword: "",
                currPassword: "",
                error: "",
              }));
            }
          })
          .catch((err) => {
            console.log(err);
            handleErrors(err);
          });
        setLoading(false);
        setErrors({});
      })
      .catch((validationErrors) => {
        const formattedErrors = validationErrors.inner.reduce(
          (acc, error) => {
            acc[error.path] = error.message;
            return acc;
          },
          {}
        );
        setLoading(false);
        setErrors(formattedErrors);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    clearErrorMsg(name);
  };

  const clearErrorMsg = (inputName) => {
    setErrors((prevState) => ({
      ...prevState,
      [inputName]: "",
    }));
  };

  const showTogglePwd = () => {
    const { password, currPassword, confirmPassword } = userForm;

    if (!!password || !!currPassword || !!confirmPassword) {
      return (
        <InputAdornment
          position="end"
          onClick={() => setShowPassword(!showPassword)}
        >
          <TogglePasswordIcon showPassword={showPassword} />
        </InputAdornment>
      );
    }
  };
  /* https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete-street-address */
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col"
        data-testid="editDetailsForm"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <TextField
            id="name"
            label="Name"
            type="text"
            name="name"
            error={!!errors?.name} //Turn to boolean with !! otherwise MUI complains about expecting a boolean
            value={userForm.name}
            onChange={handleChange}
            helperText={errors?.name}
            autoComplete="name"
            onBlur={() => clearErrorMsg("name")}
          />

          <TextField
            id="edit-email"
            label="Email"
            type="email"
            name="email"
            error={!!errors?.email}
            autoComplete="email"
            value={userForm.email}
            onChange={handleChange}
            helperText={errors?.email}
            onBlur={() => clearErrorMsg("email")}
          />

          <TextField
            id="password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            name="password"
            error={!!errors?.password}
            autoComplete="new-password"
            value={userForm.password}
            onChange={handleChange}
            helperText={errors?.password}
            onBlur={() => clearErrorMsg("password")}
            sx={{ mb: 6 }}
            InputProps={{
              startAdornment: showTogglePwd(),
            }}
          />

          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            error={!!errors?.confirmPassword}
            autoComplete="new-password"
            value={userForm.confirmPassword}
            onChange={handleChange}
            helperText={errors?.confirmPassword}
            onBlur={() => clearErrorMsg("confirmPassword")}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: showTogglePwd(),
            }}
          />

          {/**
           * If the user hasn't placed an order yet they will not have an address
           * On file so let's hide these inputs.
           */}
          {userForm.address ? (
            <>
              <TextField
                id="address"
                label="Address"
                type="text"
                name="address"
                data-testid="address"
                error={!!errors?.address}
                autoComplete="address-line1"
                value={userForm.address}
                onChange={handleChange}
                helperText={errors?.address}
                onBlur={() => clearErrorMsg("address")}
              />

              <TextField
                id="addressLine1"
                label="Address Line 1"
                type="text"
                name="addressLine1"
                autoComplete="on"
                placeholder="optional"
                value={userForm.addressLine1}
                onChange={handleChange}
              />
              <TextField
                id="city"
                label="City"
                type="text"
                name="city"
                error={!!errors?.city}
                autoComplete="home city"
                value={userForm.city}
                onChange={handleChange}
                helperText={errors?.city}
                onBlur={() => clearErrorMsg("city")}
              />
              <TextField
                id="state"
                label="State"
                type="text"
                name="state"
                error={!!errors?.state}
                autoComplete="address-level11"
                value={userForm.state}
                onChange={handleChange}
                helperText={errors?.state}
                onBlur={() => clearErrorMsg("state")}
              />
              <TextField
                id="zip"
                label="Zip Code"
                type="text"
                name="zip"
                error={!!errors?.zip}
                autoComplete="postal-code"
                value={userForm.zip}
                onChange={handleChange}
                helperText={errors?.zip}
                onBlur={() => clearErrorMsg("zip")}
              />
            </>
          ) : null}
          <TextField
            id="currPassword"
            label="Current Password"
            type={showPassword ? "text" : "password"}
            name="currPassword"
            error={!!errors?.currPassword}
            autoComplete="current-password"
            value={userForm.currPassword}
            onChange={handleChange}
            helperText={errors?.currPassword}
            onBlur={() => clearErrorMsg("currPassword")}
            sx={{ mb: 6 }}
            InputProps={{
              startAdornment: showTogglePwd(),
            }}
          />
          {userForm.currPassword === "" ? (
            <p className="text-center text-xs font-semibold text-zinc-50">
              Enter your current password to make these changes.
            </p>
          ) : (
            ""
          )}
        </Box>
        <Button
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5px",
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          {loading ? <LoadingSpinner /> : "Submit"}
        </Button>
        <div className="text-red-500 text-center mx-auto mt-2 ">
          {userForm.error && userForm.error}
        </div>
      </form>
      <span className="text-xs text-yellow-500 mt-5">
        {userForm.address
          ? null
          : "Note: You will be able to edit your address after you place an order."}
      </span>
    </>
  );
};

export default EditDetails;
