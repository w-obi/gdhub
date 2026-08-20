import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ChevronDown, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useDispatch } from "react-redux";
import { exitUser } from "@/tools/storeRed/storeLog";

export function AppSidebar() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-4">
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

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Current language: {i18n.language}
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
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => dispatch(exitUser())}
          className="flex items-center gap-2 px-4"
        >
          <p>Log out</p>
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
