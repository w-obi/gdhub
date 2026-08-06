import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1>Welcome to the Minigame Hub!</h1>
    </div>
  ),
})