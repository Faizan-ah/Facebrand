import { useNavigate } from "react-router-dom";

import { routeNames } from "../routes/routeNames";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div id="error-page" className="text-center mt-4">
      <h1 className="font-bold text-2xl">Oops!</h1>
      <p className="my-2">Sorry, an unexpected error has occurred.</p>
      <Button onClick={() => navigate(routeNames.public.home)}>Go to Home</Button>
    </div>
  );
};

export default ErrorPage;
