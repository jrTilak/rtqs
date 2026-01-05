import { scan } from "react-scan"; // must be imported before React and React DOM

import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import "./index.css"

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { RootProvider } from './providers/root-provider'

// Create a new router instance
const router = createRouter({ routeTree })

scan({
  enabled: import.meta.env.DEV,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>,
  )
}
