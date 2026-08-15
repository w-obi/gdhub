import { createFileRoute } from "@tanstack/react-router";

import { ChevronRight, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@base-ui/react";

import galaga from "@/assets/gamepng/space_shoot.png";
import shooter from "@/assets/gamepng/shoot.png";
import uknow from "@/assets/gamepng/sans.png";
import dream from "@/assets/gamepng/dream.png";
import farm from "@/assets/gamepng/farm.png";
import fondo from "@/assets/gamepng/fondo.png";
import hld from "@/assets/gamepng/hld.png";
import pic from "@/assets/gamepng/pic.png";
import toy from "@/assets/gamepng/toy.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/games")({
  component: RouteComponent,
});

const games: gameSummary[] = [
  {
    Name: "Galaga",
    Pic: galaga,
    Rating: 5.0,
    Summary: "this is galaga which Stark mentioned",
  },
  { Name: "Shooteer", Pic: shooter, Rating: 3.0, Summary: "too much blood" },
  {
    Name: "u know",
    Pic: uknow,
    Rating: 5.0,
    Summary: "you must have played it",
  },
  { Name: "dream", Pic: dream, Rating: 4.0, Summary: "dddddddddddddd" },
  { Name: "farm", Pic: farm, Rating: 3.0, Summary: "ffffffffffffffffffffff" },
  { Name: "fondo", Pic: fondo, Rating: 2.0, Summary: "fffffffoooooooooffffff" },
  { Name: "hld", Pic: hld, Rating: 1.0, Summary: "hhhhhhhhhhhhhhhhhhhhhhh" },
  {
    Name: "pic",
    Pic: pic,
    Rating: 5.0,
    Summary: "piiiiiiiiiiiiiiiiiiiiiiic",
  },
  {
    Name: "toy",
    Pic: toy,
    Rating: 4.0,
    Summary: "toooooooooooooooooooooooy",
  },
];

const handleSearchSubmit = () => {};

function RouteComponent() {
  const [sinput, setSinput] = useState<string>("");
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-16">{t("games.gamelist")}</h1>

      <InputGroup className="mt-8 max-w-xs">
        <InputGroupInput
          placeholder={t("games.searchplc")}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSinput(event.target.value);
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button
            className="cursor-pointer rounded-md hover:bg-zinc-300"
            onClick={handleSearchSubmit}
          >
            <ChevronRight />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="mt-8 grid grid-cols-3">
        {games.map((game, id) => (
          <Card>
            <CardHeader>
              <CardTitle>{game.Name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={game.Pic}
                alt={game.Name}
                className="aspect-square h-auto w-auto"
                width={10}
                height={10}
              />
              <span className="mt-4">{game.Rating}</span>
              <p className="mt-4">{game.Summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
