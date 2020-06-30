import React, { useState, FormEvent, useEffect } from 'react';
import './styles.ts'
import { Title, Form, Repositories, Error } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');
        if (storageRepositories) return JSON.parse(storageRepositories);
        return [];
    });
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!newRepo) {
            setInputError('Digite o autor/nome do repositorio')
            return;
        }

        try {
            const { data } = await api.get<Repository>(`repos/${newRepo}`);
            if (data) {
                setRepositories([...repositories, data]);
                setInputError('');
            }

        }
        catch (err) {
            setInputError('Erro na busca do repositório');
        }

    }

    return (
        <>
            <img src={logoImg}></img>
            <Title>Explore repositórios no Github.</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository} >
                <input type="text" placeholder="Digite o nome do repositório" onChange={(e) => setNewRepo(e.target.value)} />
                <button type="submit">Pesquisar</button>
            </Form>
            {inputError && (<Error> {inputError} </Error>)}
            {repositories.map(repository => (
                <Repositories key={repository.full_name}>
                    <Link to={`repository/${repository.full_name}`}>
                        <img src={repository.owner.avatar_url}></img>
                        <div>
                            <strong>{repository.owner.login}</strong>
                            <p>{repository.description} </p>
                        </div>
                        <FiChevronRight fontSize={20} />
                    </Link>
                </Repositories>
            ))}

        </>
    );
}

export default Dashboard;