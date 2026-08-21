import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { logUser } from "@/tools/storeRed/storeLog";
import type { AuthSearch } from "@/interfaces/interfaces";
import { useGoogleLogin } from "@react-oauth/google";
import api from "@/tools/api";
import { useTranslation } from "react-i18next";
import { roleAdmin, roleUser } from "@/tools/storeRed/storeUsrRole";

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
  const { t } = useTranslation();

  const handleLog = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logUser());
    navigate({ to: redirect || "/" });
  };

  const logWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/auth/google", {
          accessToken: tokenResponse.access_token,
        });

        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.token);
          dispatch(logUser());

          const userRole = res.data.role;

          if (userRole == "Admin") dispatch(roleAdmin());
          else dispatch(roleUser());

          navigate({ to: redirect || "/" });
        }
      } catch (error) {
        console.error("Backend validation failed", error);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <form className="flex flex-col justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("auth.logtoacc")}</CardTitle>
          <CardDescription>{t("auth.enteremail")}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            variant="outline"
            className="w-full"
            onClick={() => logWithGoogle()}
          >
            {t("auth.logoogle")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
