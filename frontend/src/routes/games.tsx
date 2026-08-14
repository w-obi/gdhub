import { createFileRoute } from "@tanstack/react-router";

import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import galaga from "@/assets/gamepng/space_shoot.png";
import shooter from "@/assets/gamepng/shoot.png";
import uknow from "@/assets/gamepng/sans.png";
import dream from "@/assets/gamepng/dream.png";
import farm from "@/assets/gamepng/farm.png";
import fondo from "@/assets/gamepng/fondo.png";
import hld from "@/assets/gamepng/hld.png";
import pic from "@/assets/gamepng/pic.png";
import toy from "@/assets/gamepng/toy.png";

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

function RouteComponent() {
  const { isLight } = Route.useRouteContext();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-16">List of Games</h1>

      <InputGroup className="mt-8 max-w-xs">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>

      <div className="mt-8 grid grid-cols-3">
        {games.map((game, id) => (
          <div
            className={`p-6 border-black border-t-4 border-l-4 ${id % 3 == 2 ? "border-r-4" : ""} ${id / 3 >= games.length / 3 - 1 ? "border-b-4" : ""} border-black`}
          >
            <p className="mb-4">{game.Name}</p>
            <img
              src={game.Pic}
              alt={game.Name}
              className="aspect-square h-auto w-auto"
              width={10}
              height={10}
            />
            <span className="mt-4">{game.Rating}</span>
            <p className="mt-4">{game.Summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
