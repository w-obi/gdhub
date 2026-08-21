import { createFileRoute } from "@tanstack/react-router";

import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { GameSummaryDto } from "@/interfaces/interfaces";
import { getGames } from "@/endpoints/endpoints";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/games")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sinput, setSinput] = useState<string>("");
  const { t } = useTranslation();
  const { games, isLoading, isError } = getGames();
  const gamesArr = Array.isArray(games) ? games : [];

  const filteredGames = gamesArr.filter((game: GameSummaryDto) =>
    game.Name.toLowerCase().includes(sinput.toLowerCase()),
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-16">{t("games.gamelist")}</h1>

      <InputGroup className="mt-8 max-w-xs">
        <InputGroupInput
          placeholder={t("games.searchplc")}
          value={sinput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSinput(event.target.value);
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {isError ? (
        <Card className="mt-8 w-full max-w-[80%]">
          <CardContent className="flex justify-center">
            <p className="text-red-500">{t("games.error")}</p>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <Card className="mt-8 w-full max-w-[40%]">
          <CardContent className="flex flex-row items-center justify-center gap-3 pt-6">
            <Spinner />
            <p>{t("games.loading")}</p>
          </CardContent>
        </Card>
      ) : gamesArr.length == 0 ? (
        <Card className="mt-8 w-full max-w-[80%]">
          <CardContent className="flex justify-center">
            <p className="font-bold">{t("games.nogames")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid grid-cols-3">
          {filteredGames?.map((game: GameSummaryDto) => (
            <Card key={game.Id}>
              <CardHeader>
                <CardTitle>{game.Name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={game.PicUrl}
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
      )}
    </div>
  );
}
