import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRegister } from "@/types/user";
import { useLoginUser, useRegisterUser } from "@/features/useUser";
import { convertToServerDateFormat, isBefore } from "@/lib/dateUtility";
import { routeNames } from "@/routes/routeNames";
import { useNavigate } from "react-router-dom";
import { saveDataToLocalStorage } from "@/lib/utils";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ROLE_ADMIN } from "@/lib/accessControl";

const RegisterSchema: ZodType<UserRegister> = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  birthDate: z
    .string()
    .min(1, { message: "Birth date is required" })
    .refine(
      (date) => {
        return isBefore(date);
      },
      { message: "Birth date cannot be in the future" }
    ),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+\d{5,}$/, { message: "Invalid phone number format" }),
  email: z.string().email({ message: "Invalid email address." }).nonempty("Email is required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, {
      message: "Password must include at least one letter and one number"
    })
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserRegister>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur"
  });

  const navigate = useNavigate();
  const registerUser = useRegisterUser();
  const login = useLoginUser();
  const { dispatch } = useGlobalState();

  const onSubmit = (data: UserRegister) => {
    const loginUser = {
      email: data.email,
      password: data.password
    };
    const user: UserRegister = {
      ...data,
      birthDate: convertToServerDateFormat(data.birthDate) // Ensure the date is formatted properly
    };

    registerUser.mutate(user, {
      onSuccess: () => {
        login.mutate(loginUser, {
          onSuccess: (loginData) => {
            saveDataToLocalStorage("authToken", loginData?.token);
            saveDataToLocalStorage("user", loginData?.user);
            dispatch({ type: "SET_USER", payload: loginData?.user ?? null });
            navigate(
              loginData?.user?.role === ROLE_ADMIN
                ? routeNames.admin.dashboard
                : routeNames.public.home
            );
          }
        });
      }
    });
  };

  return (
    <div className="w-full flex justify-center mx-auto h-screen items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input className="my-2" placeholder="Enter first name.." {...register("firstName")} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div>
            <Input className="my-2" placeholder="Enter last name.." {...register("lastName")} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
          <div>
            <Input
              className="my-2"
              type="date"
              placeholder="Enter birthdate.."
              {...register("birthDate")}
            />
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
          </div>
          <div>
            <Input
              className="my-2"
              placeholder="Enter phone number.."
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <Input
              className="my-2"
              type="email"
              placeholder="Enter email.."
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              className="my-2"
              type="password"
              placeholder="Enter password.."
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={registerUser.isPending || login.isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </Button>
        </form>
      </div>
      <img
        src="./public/images/authImage.svg"
        className="w-6/12 h-3/4 md:flex hidden "
        alt="Phone image"
      />
    </div>
  );
};

export default Register;
