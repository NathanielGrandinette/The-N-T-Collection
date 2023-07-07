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

  return (
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
        <FormControl error={errors ? true : false}>
          <TextField
            id="name"
            label="Name"
            type="text"
            name="name"
            error={!!errors?.name} //Turn to boolean with !! otherwise MUI complains about expecting a boolean
            value={userForm.name}
            onChange={handleChange}
            helperText={errors?.name}
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
        </FormControl>
        <FormControl error={errors ? true : false}>
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            error={!!errors?.password}
            autoComplete="on"
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
            autoComplete="on"
            value={userForm.confirmPassword}
            onChange={handleChange}
            helperText={errors?.confirmPassword}
            onBlur={() => clearErrorMsg("confirmPassword")}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: showTogglePwd(),
            }}
          />
        </FormControl>
        <FormControl error={errors ? true : false}>
          <TextField
            id="address"
            label="Address"
            type="text"
            name="address"
            data-testid="address"
            error={!!errors?.address}
            autoComplete="on"
            value={userForm.address}
            onChange={handleChange}
            helperText={errors?.address}
            onBlur={() => clearErrorMsg("address")}
          />
        </FormControl>
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
          autoComplete="on"
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
          autoComplete="on"
          value={userForm.state}
          onChange={handleChange}
          helperText={errors?.state}
          onBlur={() => clearErrorMsg("state")}
        />
        <FormControl error={errors ? true : false}>
          <TextField
            id="zip"
            label="Zip Code"
            type="text"
            name="zip"
            error={!!errors?.zip}
            autoComplete="on"
            value={userForm.zip}
            onChange={handleChange}
            helperText={errors?.zip}
            onBlur={() => clearErrorMsg("zip")}
          />
        </FormControl>
        <FormControl error={errors ? true : false}>
          <TextField
            id="currPassword"
            label="Current Password"
            type={showPassword ? "text" : "password"}
            name="currPassword"
            error={!!errors?.currPassword}
            autoComplete="on"
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
        </FormControl>
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
  );
};

export default EditDetails;
