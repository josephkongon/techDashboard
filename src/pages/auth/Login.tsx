import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthLayout from "./AuthLayout";
import useLogin from "@/hooks/useLogin.ts";
import { Controller } from "react-hook-form";
import Feedback from "react-bootstrap/esm/Feedback";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Spin } from "antd";

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p>
          <Link to={"/auth/forget-password"} className="text-white-50 ms-1">
            {t("Forgot your password?")}
          </Link>
        </p>
        <p className="text-white-50">
          {t("Don't have an account?")}{" "}
          <Link to={"/auth/register"} className="text-white ms-1">
            <b>{t("Sign Up")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Login = () => {
  const { t } = useTranslation();

  const { handleLogin, control, isLoading } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Spin spinning={isLoading}>
      <AuthLayout
        helpText={t(
          "Enter your email address and password to access admin panel.",
        )}
        bottomLinks={<div style={{ paddingBottom: "2rem" }} />}
      >
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <FormGroup>
                  <FormLabel htmlFor="email">{t("Email")}</FormLabel>
                  <FormControl
                    id="email"
                    {...field}
                    isInvalid={Boolean(fieldState.error?.message)}
                  />
                  {fieldState.error?.message && (
                    <Feedback type="invalid" className="text-danger">
                      {fieldState.error?.message}
                    </Feedback>
                  )}
                </FormGroup>
              )}
            />
          </div>

          <div className="mb-3">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <FormGroup>
                  <FormLabel htmlFor="password">{t("Password")}</FormLabel>

                  <div className="position-relative">
                    <FormControl
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      isInvalid={Boolean(fieldState.error?.message)}
                    />
                    {fieldState.error?.message && (
                      <Feedback type="invalid" className="text-danger">
                        {fieldState.error?.message}
                      </Feedback>
                    )}
                    <span
                      className="d-flex position-absolute top-50 end-0 translate-middle-y p-0 pe-2 me-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!fieldState.error &&
                        (showPassword ? (
                          <FiEye
                            height={18}
                            width={18}
                            className="cursor-pointer"
                          />
                        ) : (
                          <FiEyeOff
                            height={18}
                            width={18}
                            className="cursor-pointer"
                          />
                        ))}
                    </span>
                  </div>
                </FormGroup>
              )}
            />
          </div>

          <div className="text-center d-grid">
            <Button variant="primary" type="submit">
              {t("Log In")}
            </Button>
          </div>
        </form>
      </AuthLayout>
    </Spin>
  );
};

export default Login;
