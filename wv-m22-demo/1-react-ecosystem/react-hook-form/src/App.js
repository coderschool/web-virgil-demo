import React, { useState } from "react";
import { useForm, useFormContext, Controller } from "react-hook-form";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import "./App.css";
import {
  FormProvider,
  FTextField,
  FCheckbox,
  FMultiCheckbox,
  FRadioGroup,
  FSelect,
  FSwitch,
} from "./components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

function App() {
  const defaultValues = {
    username: "",
    email: "",
    password: "123",
    remember: true,
    gender: "Female",
    codingLanguage: [],
    country: "",
    isGoing: false,
  };

  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // setError("afterSubmit", { message: "Server Response Error" });
  };

  return (
    <div>
      <Typography variant="h3" textAlign="center" mb={3}>
        React Hook Form
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <FTextField name="username" label="Username" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FRadioGroup name="gender" options={["Male", "Female"]} />
          <FMultiCheckbox name="codingLanguage" options={["Python", "JS"]} />
          <FSelect name="country" label="Country">
            {[
              { code: "VNM", label: "Vietnam" },
              { code: "CAM", label: "Cambodia" },
            ].map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FSwitch name="isGoing" label="Is Going" />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </div>
  );
}

export default App;
