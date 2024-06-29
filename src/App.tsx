import Todo from './Todo'
import { AppShell, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme='dark' forceColorScheme='dark'>
      <AppShell padding="lg">
        <AppShell.Main w="100vw">
          <Todo></Todo>
        </AppShell.Main>

      </AppShell>
    </MantineProvider>
  )
}

export default App
