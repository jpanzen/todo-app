// @ts-check

import React, { useState } from 'react';
import { Flex, Button, Group, Center, ActionIcon, Input, CloseButton } from '@mantine/core';
import { IconCheck, IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Task } from './models/Task';

export default function Todo() {
  const [text, setText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Vyvencit psa" },
    { id: 2, title: "Vyvencit kocku" },
    { id: 3, title: "Uvarit obed pro psa" },
    { id: 4, title: "Uvarit obed pro kocku" }
  ]);

  function moveTaskUp(index: number) {
    if (index === 0) return; // První úkol nelze přesunout nahoru
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  }
  
  function moveTaskDown(index: number) {
    if (index === tasks.length - 1) return; // Poslední úkol nelze přesunout dolů
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    setTasks(newTasks);
  }

  function addTask(title: string) {
    if (title === '') return;
    const newTask = {
      id: Date.now(),
      title
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  return (
    <Center>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        <Group justify="space-between" maw="90vw" w="600">
          <Input
            placeholder="Vložte nový úkol"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setText('')}
                style={{ display: text ? undefined : 'none' }}
              />
            }
          />
          <Button variant='light' onClick={() => addTask(text)}>Přidat úkol</Button>
        </Group>
        {tasks.map((task, index) => (
          <Group key={task.id} bg='#2e2e2e' justify="space-between" maw="90vw" w="600" style={{ borderRadius: '8px', border: '1px solid #424242', padding: '8px' }}>
            <span>{task.title}</span>
            <Flex gap="xs" justify="flex-start" align="center">
              <ActionIcon onClick={() => moveTaskUp(index)} color="blue" variant="light">
                <IconArrowUp size={20} />
              </ActionIcon>
              <ActionIcon onClick={() => moveTaskDown(index)} color="blue" variant="light">
                <IconArrowDown size={20} />
              </ActionIcon>
              <ActionIcon color="green" variant="light">
                <IconCheck size={20} />
              </ActionIcon>
            </Flex>
          </Group>
        ))}
      </Flex>
    </Center>
  );
}