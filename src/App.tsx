import { useState } from 'react'
import Todo from './Todo'
import { AppShell, Burger } from '@mantine/core'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [count, setCount] = useState(0)

  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell padding="lg">
        <AppShell.Main w="100vw">
          <Todo></Todo>
        </AppShell.Main>

      </AppShell>
    </MantineProvider>
  )
}

export default App
