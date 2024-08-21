import { useNavigate } from "react-router-dom";
import { routeNames } from "../routes/routeNames";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-4">
      <h1 className="font-bold text-2xl">Page Not Found!</h1>
      <p className="my-2">Want to go back?</p>
      <Button onClick={() => navigate(routeNames.Public.home)}>Go to Home</Button>
    </div>
  );
}
