import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserLogin } from "@/types/user";
import { useLoginUser } from "@/features/useUser";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routeNames";
import { saveDataToLocalStorage } from "@/lib/utils";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ROLE_ADMIN } from "@/lib/accessControl";

export const UserSchema: ZodType<UserLogin> = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required" })
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLogin>({
    resolver: zodResolver(UserSchema)
  });

  const loginUser = useLoginUser();
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const handleLogin = (data: UserLogin) => {
    loginUser.mutate(data, {
      onSuccess: (responseData) => {
        saveDataToLocalStorage("authToken", responseData?.token);
        saveDataToLocalStorage("user", responseData?.user);
        dispatch({ type: "SET_USER", payload: responseData?.user ?? null });
        responseData?.user.role === ROLE_ADMIN
          ? navigate(routeNames.admin.dashboard)
          : navigate(routeNames.public.home);
      }
    });
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="./images/authImage.svg" className="w-6/12 h-1/2 " alt="Phone image" />
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <Input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter email.."
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter password.."
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
