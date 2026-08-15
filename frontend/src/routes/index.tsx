import { createFileRoute } from "@tanstack/react-router";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import galaga from "@/assets/gamepng/space_shoot.png";
import shooter from "@/assets/gamepng/shoot.png";
import uknow from "@/assets/gamepng/sans.png";
import { Button } from "@/components/ui/button";

import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const gamePics: gamePics[] = [
  { Name: "Galaga", Pic: galaga },
  { Name: "Shooteer", Pic: shooter },
  { Name: "u know", Pic: uknow },
];

function RouteComponent() {
  const { isLight } = Route.useRouteContext();
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-16">{t("index.welcome")}</h1>

      <p className="mt-8 w-[60%]">{t("index.welc-desc")}</p>

      <p className="mt-8 font-bold">{t("index.glhf")}</p>

      <div className="flex flex-col mt-4 border-4 rounded-2xl border-black p-3">
        <p className="mb-3">{t("index.signtocont")}</p>
        <Button>{t("index.login")}</Button>
      </div>

      <div className="mt-8 rounded-2xl border-4 border-black p-8 w-[80%]">
        <p className="font-bold text-2xl mb-4">{t("index.chosenones")}</p>
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
      </div>

      <div className="mt-16">
        <p>{t("index.faceprob")}</p>

        <p>+0(000)0000000</p>
      </div>
    </div>
  );
}
