import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/custcomp/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/tools/store";
import type { RouterContext } from "@/interfaces/interfaces";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
});

function RouteComponent() {
  const isLog = useSelector((state: RootState) => state.auth.isLog);
  const { t, i18n } = useTranslation();

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
                  search={{ redirect: "/games" }} // /auth?redirect=/games
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
