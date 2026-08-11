import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/games" className="[&.active]:font-bold">
          Minigames
        </Link>
        <Link to="/admin" className="[&.active]:font-bold">
          Admin panel
        </Link>
      </nav>

      <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Open
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

      <hr />
      
      {/* <Outlet /> is where your child pages will render */}
      <Outlet />
      
      {/* Adds a helpful debugging widget in the bottom corner */}
      <TanStackRouterDevtools />
    </>
  ),
})