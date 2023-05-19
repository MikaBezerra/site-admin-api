import React, { useEffect, useState } from "react";

import styles from './listaPortfolio.module.css';
import { Portfolio, deletePortfolio, getPortfolio } from "../../../services/portfolioServices";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/button";
import Table from "../../../components/common/table/Table";

const ListaPortfolio: React.FC = () => {
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

    const fetchPortfolios = async () => {
        try {
            const portfolios = await getPortfolio();
            setPortfolio(portfolios);
        } catch (error) {
            console.log("Erro ao buscar portfólio.", error);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const handleEdit = (index: number) => {
        const selectedPortfolio = portfolio[index];
        navigate("/portfolio/cadastro", { state: selectedPortfolio });
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePortfolio(id);
            fetchPortfolios();
            alert("Portfólio deletado com sucesso!");
        } catch (error) {
            console.log("Erro ao deletar o portfólio.", error);
            alert("Erro ao deletar o portfólio");
        }
    };


    return (
        <Table
            data={portfolio}
            columns={['Título', 'Imagem', 'Link', 'Ações']}
            renderRow={(portfolio, index) => (
                <>
                    <td>{portfolio.title}</td>
                    <td><img src={portfolio.image} alt="Imagem do portfolio"></img></td>
                    <td>{portfolio.link}</td>
                    <td>
                        <Button small onClick={() => handleEdit(index)}>Editar</Button>
                        <Button small onClick={() => handleDelete(portfolio.id)}>Excluir</Button>
                    </td>
                </>
            )}></Table>
    );
};

export default ListaPortfolio;