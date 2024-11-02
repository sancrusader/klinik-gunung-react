import { ThemeProvider } from "@/Components/theme-provider"

function App({
    children,
    scrollable = false,
}: {
    children: React.ReactNode;
    scrollable?: boolean;
}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export default App
