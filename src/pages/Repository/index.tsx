import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface RepositoryParams {
    id: string;
}
interface Issue {
    id: number;
    title: string;
    user: {
        login: string;
    }
    html_url: string;
}
interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    useEffect(() => {
        async function loadData() {
            const [repositoryResponse, issuesResponse] = await Promise.all([
                api.get<Repository>(`repos/${params.id}`),
                api.get<Issue[]>(`repos/${params.id}/issues`)
            ]);
            setRepository(repositoryResponse.data);
            setIssues(issuesResponse.data);
        }
        loadData();

    }, [params.id])
    return (
        <>
            <Header>
                <img src={logoImg} />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (<RepositoryInfo>
                <header>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <div>
                        <strong> {params.id} </strong>
                        <p> {repository.description} </p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Starts</span>
                    </li>
                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>)}

            {issues.map(issue => (
                <Issues key={issue.id}>
                    <a href={`${issue.html_url}`}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login} </p>
                        </div>
                        <FiChevronRight fontSize={20} />
                    </a>
                </Issues>
            ))}

        </>
    );
}

export default Repository;