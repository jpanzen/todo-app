// @ts-check

import React, { useState, useEffect } from 'react';
import { Flex, Button, Group, Center, ActionIcon, Input, CloseButton } from '@mantine/core';
import { IconCheck, IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Task } from './models/Task';

export default function Todo() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksLocal = localStorage.getItem('tasks');
    // Pokud existuje něco v localStorage, načtou se data z localStorage, pokud ne -> defaultní hodnoty
    return tasksLocal ? JSON.parse(tasksLocal) : [
      {id:1, title: "Uvařit guláš"},
      {id:2, title: "Vyvenčit psa"},
      {id:3, title: "Dát si pivko"}
    ];
  });

  // Pokud nastane změna v tasks v appce, tak dojde k přepsání tasks v localStorage paměti
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Funkce obsluhující tlačítko pro posouvání úkolů nahoru
  function moveTaskUp(index: number) {
    if (index === 0) return; // První úkol nelze přesunout nahoru
    const newTasks = [...tasks]; // Vytvoření kopie pole s úkoly
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]]; // Switch úkolů
    setTasks(newTasks);
  }
  
  // Funkce obsluhující tlačítko pro posouvání úkolů dolů
  function moveTaskDown(index: number) {
    if (index === tasks.length - 1) return; // Poslední úkol nelze přesunout dolů
    const newTasks = [...tasks]; // Vytvoření kopie pole s úkoly
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]]; // Switch úkolů
    setTasks(newTasks);
  }

  // Funkce obsluhující tlačítko pro dokončení úkolů
  function finishTask(id: number){
    const updatedTasks = tasks.filter(task => task.id !== id); // Kopie pole s filtrovacím pravidlem, kde se kopírují pouze ty které nemají mazané id úkolu
    setTasks(updatedTasks);
  }

  // Funkce obsluhující přidávání úkolů
  function addTask(title: string) {
    if (title === '') return; // Nemůžeme přidat prázdný úkol
    // Zde vytvářím nový objekt
    const newTask = {
      id: Date.now(),
      title
    };
    setTasks([...tasks, newTask]); // Nový task se appenduje ke stávajícím
    setText(''); // "Vynulování" pole s textem
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