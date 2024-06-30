// @ts-check

import React, { useState, useEffect } from 'react';
import { Flex, Button, Group, Center, ActionIcon, Input, CloseButton } from '@mantine/core';
import { IconCheck, IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Task } from './models/Task';
import useTasksStore from './tasksStore';
import useTextStore from './textStore';

export default function Todo() {
  const { text, setText } = useTextStore();
  const { tasks, addTask, finishTask, moveTaskUp, moveTaskDown } = useTasksStore();

  const handleAddTask = () =>{
    addTask(text);
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addTask(text);
              }
            }}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setText('')}
                style={{ display: text ? undefined : 'none' }}
              />
            }
          />
          <Button variant='light' onClick={ handleAddTask }>Přidat úkol</Button>
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
              <ActionIcon onClick={() => finishTask(task.id)} color="green" variant="light">
                <IconCheck size={20} />
              </ActionIcon>
            </Flex>
          </Group>
        ))}
      </Flex>
    </Center>
  );
}