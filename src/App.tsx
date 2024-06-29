import { useState } from 'react'
import Todo from './Todo'
import { AppShell } from '@mantine/core'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
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
