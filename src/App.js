import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const repositoryRandomNumber = Math.floor(Math.random() * 50);

    const newRepository = {
      title: `Repository ${repositoryRandomNumber}`,
      url: `http://repo${repositoryRandomNumber}.com`,
      techs: ['Node', 'React', 'Express', 'Axios', 'Jest'],
    };

    const response = await api.post('repositories', newRepository);

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`);

    if (status === 204) {
      const updatedRepositories = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(updatedRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
