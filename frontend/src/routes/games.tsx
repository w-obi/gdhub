import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games')({
  component: () => (
    <div>
      <h1>Games List</h1>
      <p>Benobi will go here!</p>
    </div>
  ),
})