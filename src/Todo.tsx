// @ts-check

import React, { useState } from 'react'
import { Flex, Button, Group, Center } from '@mantine/core';
import { Task } from './models/task';

export default function Todo() {
  const [tasks] = useState<Task[]>([
    {id: 1, title: "Vyvencit psa", priority: 1, completed: false},
    {id: 2, title: "Vyvencit kocku", priority: 2, completed: false},
    {id: 3, title: "Uvarit obed pro psa", priority: 1, completed: false},
    {id: 4, title: "Uvarit obed pro kocku", priority: 3, completed: false}
  ]);
  
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
      {tasks.map(task => (
        <Group key={task.id} justify="space-between" maw='90vw' w='600'>
          <span>{task.title}</span>
          <Button size="sm" variant="outline">Complete</Button>
        </Group>
      ))}
      </Flex>
    </Center>
  )
}
