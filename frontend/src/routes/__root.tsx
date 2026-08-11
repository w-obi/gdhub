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
  const [isSBE, setSBE] = useState<boolean>(false); //short for "is sidebar extracted"

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

          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
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

        <div className="flex-1 p-4">
          <Outlet />
        </div>

        <TanStackRouterDevtools />
      </main>
    </SidebarProvider>
  );
}
