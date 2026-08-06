// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        {/* Notice we use <Link> instead of <a> */}
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/games" className="[&.active]:font-bold">
          Minigames
        </Link>
      </nav>
      <hr />
      
      {/* <Outlet /> is where your child pages will render */}
      <Outlet />
      
      {/* Adds a helpful debugging widget in the bottom corner */}
      <TanStackRouterDevtools />
    </>
  ),
})