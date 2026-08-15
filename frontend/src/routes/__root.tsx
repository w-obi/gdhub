import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/custcomp/app-sidebar";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/custcomp/mode-toggle";

import { ChevronDown, LogOut } from "lucide-react";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/tools/store";
import type { RouterContext } from "@/interfaces/interfaces";
import { exitUser } from "@/tools/storeRed/storeLog";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
});

function RouteComponent() {
  const isLog = useSelector((state: RootState) => state.auth.isLog);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 flex flex-col min-h-screen overflow-hidden w-full">
          <div className="flex justify-between items-center px-4 mt-1">
            <nav className="flex gap-4 items-center p-2">
              <SidebarTrigger />

              <Link to="/" className="[&.active]:font-bold">
                <h1>{t("root.home")}</h1>
              </Link>
              {isLog ? (
                <Link to="/games" className="[&.active]:font-bold">
                  {t("root.games")}
                </Link>
              ) : (
                <Link
                  to="/auth"
                  search={{ redirect: "/games" }} // This creates /auth?redirect=/games
                  className="[&.active]:font-bold"
                >
                  {t("root.games")}
                </Link>
              )}
              <Link
                to={isLog ? "/admin" : "/auth"}
                className="[&.active]:font-bold"
              >
                {t("root.adminpanel")}
              </Link>
            </nav>

            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  {i18n.language}
                  <ChevronDown />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => changeLang("ENG")}>
                      {t("root.ENG")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLang("RUS")}>
                      {t("root.RUS")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLang("KAZ")}>
                      {t("root.KAZ")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  {t("root.settings")}
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

              <Button onClick={() => dispatch(exitUser())}>
                <LogOut />
              </Button>
            </div>
          </div>

          <hr className="my-1" />

          <div className="p-12">
            <Outlet />
          </div>

          <TanStackRouterDevtools />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
