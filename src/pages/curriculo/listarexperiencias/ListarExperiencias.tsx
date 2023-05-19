import React, { useEffect } from "react";
import { Experiencia, deleteExperiencia, getExperiencia } from "../../../services/experienciaServices";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import Table from "../../../components/common/table/Table";

const ListarExperiencias: React.FC = () => {
    const navigate = useNavigate();

    const [experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencia();
            setExperiencias(experiencias);
        } catch (error) {
            console.log('Erro ao buscar experiências.', error);
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteExperiencia(id);
            fetchExperiencias();
            alert("Experiência deletada com sucesso!")
        } catch (error) {
            console.log("Erro ao deletar experiência.", error);
            alert("Erro ao deletar experiência.");
        }
    };

    const handleEdit = (experiencia: Experiencia) => {
        navigate("/curriculo/experiencia/cadastro", { state: experiencia });
    };

    return (
        
            <Table
                data={experiencias}
                columns={['Título', 'Ano de Início', 'Ano de Fim', 'Descrição', 'Tipo', 'Ações']}
                renderRow={(experiencia, index) => (
                    <>
                        <td>{experiencia.titulo}</td>
                        <td>{experiencia.anoInicio}</td>
                        <td>{experiencia.anoFim}</td>
                        <td>{experiencia.descricao}</td>
                        <td>{experiencia.tipo}</td>
                        <td>
                            <Button small onClick={() => handleEdit(experiencia)}>Editar</Button>
                            <Button small onClick={() => handleDelete(experiencia.id)}>Excluir</Button>
                        </td>
                    </>
                )}
            ></Table>
        
    );
};

export default ListarExperiencias;
