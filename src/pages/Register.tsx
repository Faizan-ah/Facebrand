import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRegister } from "@/types/user";
import { useLoginUser, useRegisterUser } from "@/features/useUser";
import { convertToServerDateFormat } from "@/lib/dateUtility";
import { routeNames } from "@/routes/routeNames";
import { useNavigate } from "react-router-dom";
import { saveDataToLocalStorage } from "@/lib/utils";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ROLE_ADMIN } from "@/lib/accessControl";

const Register = () => {
  const { register, watch } = useForm<UserRegister>();
  const navigate = useNavigate();
  const registerUser = useRegisterUser();
  const login = useLoginUser();
  const { dispatch } = useGlobalState();

  const handleRegister = () => {
    const loginUser = {
      email: watch("email"),
      password: watch("password")
    };
    const user: UserRegister = {
      ...watch(),
      birthDate: convertToServerDateFormat(watch("birthDate"))
    };
    //TODO: refactor login and register code
    registerUser.mutate(user, {
      onSuccess: () =>
        login.mutate(loginUser, {
          onSuccess: (data) => {
            saveDataToLocalStorage("authToken", data?.token);
            saveDataToLocalStorage("user", data?.user);
            dispatch({ type: "SET_USER", payload: data?.user ?? null });
            data?.user.role === ROLE_ADMIN
              ? navigate(routeNames.admin.dashboard)
              : navigate(routeNames.public.home);
          }
        })
    });
  };
  return (
    <div className="w-6/12 mx-auto my-3 ">
      <h1 className="text-3xl font-semibold text-center my-3">Register</h1>
      <Input className="my-2" placeholder="Enter first name.." {...register("firstName")} />
      <Input className="my-2" placeholder="Enter last name.." {...register("lastName")} />
      <Input
        className="my-2"
        type="date"
        placeholder="Enter birthdate.."
        {...register("birthDate")}
      />
      <Input className="my-2" placeholder="Enter phone number.." {...register("phoneNumber")} />
      <Input className="my-2" type="email" placeholder="Enter email.." {...register("email")} />
      <Input
        className="my-2"
        type="password"
        placeholder="Enter password.."
        {...register("password")}
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
};

export default Register;
