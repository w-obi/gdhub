import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useDispatch } from "react-redux";
import { logUser } from "@/tools/storeRed/storeLog";
import type { AuthSearch } from "@/interfaces/interfaces";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { redirect } = Route.useSearch();

  const handleLog = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logUser());
    navigate({ to: redirect || "/" });
  };

  return (
    <form className="flex flex-col justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleLog}>
            Login
          </Button>
          <Button variant="outline" className="w-full" onClick={handleLog}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
