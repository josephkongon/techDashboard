import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";

import { useAuthContext } from "@/context/useAuthContext";
import { useMutation } from "react-query";

import { login } from "@/service/api/auth.ts";
import { message } from "antd";

const useLogin = () => {
  const navigate = useNavigate();

  const { saveSession } = useAuthContext();
  const [searchParams] = useSearchParams();

  const { isLoading, mutateAsync } = useMutation(
    async (payload: { email: string; password: string }) => login(payload),
  );

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const redirectUser = () => {
    const redirectLink = searchParams.get("redirectTo");
    if (redirectLink) navigate(redirectLink);
    else navigate("/");
  };

  const handleLogin = handleSubmit(async (values: LoginFormFields) => {
    mutateAsync(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (resData) => {
          message.success("Login successful");
          // saveSession({
          //   ...(resData.data ?? {}),
          //   token: res.data.token,
          // });
          // redirectUser();
        },
        onError: async (error) => {
          console.log(error);
          message.error("Login failed.");
        },
      },
    );
  });

  return { isLoading, handleLogin, control };
};

export default useLogin;
