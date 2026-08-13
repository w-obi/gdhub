import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/custcomp/app-sidebar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sun, Moon, ChevronDown } from "lucide-react";

import {
  createRootRoute,
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useState } from "react";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLight, setIsLight] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("ENG");

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 flex flex-col min-h-screen bg-zinc-50 overflow-hidden w-full">
        <div className="flex justify-between items-center px-4 mt-1">
          <nav className="flex gap-4 items-center p-2">
            <SidebarTrigger />

            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/games" className="[&.active]:font-bold">
              Games
            </Link>
            <Link to="/admin" className="[&.active]:font-bold">
              Admin panel
            </Link>
          </nav>

          <div className="m-2 flex">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                {lang}
                <ChevronDown />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>ENG</DropdownMenuItem>
                  <DropdownMenuItem>RUS</DropdownMenuItem>
                  <DropdownMenuItem>KAZ</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className={`ml-2 mr-2 ${isLight ? "bg-black" : "bg-white"}`}
              onClick={() => setIsLight(!isLight)}
            >
              {isLight ? <Sun color="#ffffff" /> : <Moon color="#000000" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="bg-black text-white" /> // fix theming
                }
              >
                Settings
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <hr className="my-1" />

        <div className="p-4">
          <Outlet />
        </div>

        <TanStackRouterDevtools />
      </main>
    </SidebarProvider>
  );
}
