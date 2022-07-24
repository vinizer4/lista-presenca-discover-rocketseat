import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    //corpo do useEffect
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/vinizer4')
      const data = await response.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }

    fetchData();
  }, 
  []);
   /* 
  Nesse array passamos o statu que quando for alterado ira executar o useEffect 
  Exemplo caso o students seja passado para o array quando o students for atualizado estaremos executando o useEffect, caso o array fique vazio por padrão o useEffect só será executado ao carregar a página
  */

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (
        <Card 
          key={student.time} 
          name={student.name} 
          time={student.time} 
        />
      ))}
    </div>
  );
}

