import React, { useEffect, useState } from 'react';

import styles from './cadastrarInformacoes.module.css';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Input from '../../../components/forms/input';
import Textarea from '../../../components/forms/textarea';
import { Informacoes, updateInformacoes, getInformacoes } from '../../../services/informacoesServices';
import InformacoesCard from './informacoesCard';
import Button from '../../../components/common/button/Button';
import Title from '../../../components/common/title/Title';

const CadastrarInformacoes: React.FC = () => {

    const [informacoes, setInformacoes] = useState<Informacoes>({} as Informacoes);

    const initialValues: Informacoes = {
        id: 1,
        foto: '',
        nome: '',
        cargo: '',
        resumo: '',
    };

    const validationSchema = Yup.object().shape({
        foto: Yup.string().required('Campo obrigatório'),
        nome: Yup.string().required('Campo obrigatório'),
        cargo: Yup.string().required('Campo obrigatório'),
        resumo: Yup.string().required('Campo obrigatório'),
    });

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            console.error('Erro a buscar informacões', error);
        }
    };

    useEffect(() => {
        fetchInformacao();
    }, []);

    const onSubmit = async (values: Informacoes, { resetForm }: { resetForm: () => void }) => {
        try {
            await updateInformacoes(values);
            setInformacoes(values);
            console.log(values);
            resetForm();
            alert('Formulário enviado com sucesso!');
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
        }
    };

    const handleDelete = async () => {
        try {
            await updateInformacoes(initialValues);
            setInformacoes(initialValues);
            alert('Informações deletadas com sucesso!');
        } catch (error) {
            console.error("Erro ao deletar as informações:", error);
            alert('Ocorreu um erro ao deletar as informações! Tente novamente.');
        }
    };

    return (
        <div className={styles.formWrapper}>

            <Formik
                initialValues={informacoes}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>

                {({ errors, touched }) => (
                    <Form className={styles.form}>

                        <Title level='h2'>Cadastrar/Atualizar Informações</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label='Resumo'
                            name='resumo'
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <Button type='submit'>Salvar</Button>

                    </Form>
                )}
            </Formik>

            {informacoes &&
                Object.entries(informacoes).some(
                    ([key, value]) => key !== "id" && value.trim() !== ""
                ) && (
                    <div className={styles.cardContainer}>
                        <InformacoesCard informacoes={informacoes} />

                        <Button red onClick={handleDelete}>Deletar</Button>
                    </div>
                )}
        </div>
    );
};

export default CadastrarInformacoes;