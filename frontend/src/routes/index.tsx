import { createFileRoute, useNavigate } from "@tanstack/react-router";

import galaga from "@/assets/gamepng/space_shoot.png";
import shooter from "@/assets/gamepng/shoot.png";
import uknow from "@/assets/gamepng/sans.png";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useTranslation } from "react-i18next";
import type { AuthSearch, gamePics } from "@/interfaces/interfaces";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
  component: RouteComponent,
});

const gamePics: gamePics[] = [
  { Name: "Galaga", Pic: galaga },
  { Name: "Shooteer", Pic: shooter },
  { Name: "u know", Pic: uknow },
];

function RouteComponent() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-16">{t("index.welcome")}</h1>

      <p className="mt-8 w-[60%]">{t("index.welc-desc")}</p>

      <p className="mt-8 font-bold">{t("index.glhf")}</p>

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

      <Card className="mt-8 w-full max-w-[80%]">
        <CardHeader>
          <CardTitle>{t("index.chosenones")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div className="flex p-2 space-x-8 pb-8">
              {gamePics.map((gamePic) => (
                <figure key={gamePic.Name} className="shrink-0 w-[50%]">
                  <div className="rounded-md">
                    <img
                      src={gamePic.Pic}
                      alt={gamePic.Name}
                      className="aspect-square h-auto w-auto"
                      width={10}
                      height={10}
                    />
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {gamePic.Name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="mt-16">
        <p>{t("index.faceprob")}</p>

        <p>+0(000)0000000</p>
      </div>
    </div>
  );
}
