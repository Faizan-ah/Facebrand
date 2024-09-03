import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserLogin } from "@/types/user";
import { useLoginUser } from "@/features/useUser";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routeNames";
import { saveDataToLocalStorage } from "@/lib/utils";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ROLE_ADMIN } from "@/lib/accessControl";

const Login = () => {
  const { register, watch } = useForm<UserLogin>();
  const loginUser = useLoginUser();
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const handleLogin = () => {
    loginUser.mutate(watch(), {
      onSuccess: (data) => {
        saveDataToLocalStorage("authToken", data?.token);
        saveDataToLocalStorage("user", data?.user);
        dispatch({ type: "SET_USER", payload: data?.user ?? null });
        data?.user.role === ROLE_ADMIN
          ? navigate(routeNames.admin.dashboard)
          : navigate(routeNames.public.home);
      }
    });
  };

  return (
    <div className="w-6/12 mx-auto my-3 ">
      <h1 className="text-3xl font-semibold text-center my-3">Login</h1>
      <Input className="my-2" type="email" placeholder="Enter email.." {...register("email")} />
      <Input
        className="my-2"
        type="password"
        placeholder="Enter password.."
        {...register("password")}
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
