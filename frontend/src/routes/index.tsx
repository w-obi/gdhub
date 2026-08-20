import { createFileRoute, useNavigate } from "@tanstack/react-router";

// import galaga from "@/assets/gamepng/space_shoot.png";
// import shooter from "@/assets/gamepng/shoot.png";
// import uknow from "@/assets/gamepng/sans.png";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useTranslation } from "react-i18next";
import type { AuthSearch /*gamePics*/ } from "@/interfaces/interfaces";
import { useSelector } from "react-redux";
import type { RootState } from "@/tools/store";
import { getGame } from "@/endpoints/endpoints";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
  component: RouteComponent,
});

// const gamePics: gamePics[] = [
//   { Name: "Galaga", Pic: galaga },
//   { Name: "Shooteer", Pic: shooter },
//   { Name: "u know", Pic: uknow },
// ];

function RouteComponent() {
  const { t, i18n } = useTranslation();
  const isLog = useSelector((state: RootState) => state.auth.isLog);
  const navigate = useNavigate();

  const game0 = getGame(1);
  const game1 = getGame(2);
  const game2 = getGame(3);
  const isLoadin = game0.isLoading || game1.isLoading || game2.isLoading;
  const isErr = game0.isError || game1.isError || game2.isError;
  const games = [game0.game, game1.game, game2.game].filter((g) => g && g.Name);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-16">{t("index.welcome")}</h1>

      <p className="mt-8 w-[60%]">{t("index.welc-desc")}</p>

      <p className="mt-8 font-bold">{t("index.glhf")}</p>

      {isLog ? null : (
        <Card className="mt-4 w-full max-w-xs">
          <CardHeader>
            <CardTitle>{t("index.signtocont")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              type="submit"
              className="w-full"
              onClick={() => navigate({ to: "/auth" })}
            >
              {t("index.login")}
            </Button>
          </CardContent>
        </Card>
      )}

      {isErr ? (
        <Card className="mt-8 w-full max-w-[80%]">
          <CardContent className="flex justify-center">
            <p className="text-red-500">{t("index.error")}</p>
          </CardContent>
        </Card>
      ) : isLoadin ? (
        <Card className="mt-8 w-full max-w-[40%]">
          <CardContent className="flex flex-row items-center justify-center gap-3 pt-6">
            <Spinner />
            <p>{t("index.loading")}</p>
          </CardContent>
        </Card>
      ) : games.length == 0 ? (
        <Card className="mt-8 w-full max-w-[80%]">
          <CardContent className="flex justify-center">
            <p className="font-bold">{t("index.nogames")}</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-8 w-full max-w-[80%]">
          <CardHeader>
            <CardTitle>{t("index.chosenones")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="flex p-2 space-x-8 pb-8">
                {games.map((gamePic) => (
                  <figure key={gamePic?.Id} className="shrink-0 w-[50%]">
                    <div className="rounded-md">
                      <img
                        src={gamePic?.PicUrl}
                        alt={gamePic?.Name}
                        className="aspect-square h-auto w-auto"
                        width={10}
                        height={10}
                      />
                    </div>
                    <figcaption className="pt-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {gamePic?.Name}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <div className="mt-16">
        <p>{t("index.faceprob")}</p>

        <p>+0(000)0000000</p>
      </div>
    </div>
  );
}
