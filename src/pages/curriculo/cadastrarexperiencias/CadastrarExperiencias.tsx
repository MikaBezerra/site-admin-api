import React from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import styles from './cadastrarexperiencias.module.css';
import Input from "../../../components/forms/input";
import Textarea from "../../../components/forms/textarea";
import Select from "../../../components/forms/select";

import { Experiencia, createOrUpdateExperiencia } from "../../../services/experienciaServices";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import Title from "../../../components/common/title";

const CadastrarExperiencias: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const experiencia = location.state as Experiencia;

    const initialValues: Experiencia = {
        id: 0,
        titulo: "",
        descricao: "",
        tipo: "",
        anoInicio: "",
        anoFim: "",
    };

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required('Campo obrigatório'),
        descricao: Yup.string(),
        tipo: Yup.string().required('Campo obrigatório'),
        anoInicio: Yup.number().required('Campo obrigatório').typeError('Digite um número'),
        anoFim: Yup.number().required('Campo obrigatório').typeError('Digite um número'),
    });

    const onSubmit = async (values: Experiencia, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateExperiencia(values);
            console.log(values);
            resetForm();
            navigate('/curriculo/experiencia/lista');
            alert('Formulário enviado com sucesso!');
        } catch (error) {
            console.log(error);
            alert('Erro ao enviar formulário');
        }
    };

    return (
        <div className={styles.formWrapper}>

            <Formik
                initialValues={experiencia || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>

                {({ errors, touched }) => (
                    <Form className={styles.form}>

                        <Title level='h2'>Cadastrar Experiência</Title>

                        <Input
                            label="Título"
                            name="titulo"
                            errors={errors.titulo}
                            touched={touched.titulo}
                        />

                        <Input
                            label="Ano de Início"
                            name="anoInicio"
                            errors={errors.anoInicio}
                            touched={touched.anoInicio}
                        />

                        <Input
                            label="Ano de Fim"
                            name="anoFim"
                            errors={errors.anoFim}
                            touched={touched.anoFim}
                        />

                        <Select
                            label="Tipo de experiência"
                            name="tipo"
                            options={[
                                { value: "profissional", label: "Profissional" },
                                { value: "academico", label: "Acadêmico" },
                            ]}
                            errors={errors.tipo}
                            touched={touched.tipo}
                        />



                        <Textarea
                            label="Descrição"
                            name="descricao"
                            errors={errors.descricao}
                            touched={touched.descricao}
                        />

                        <Button type="submit">Salvar</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CadastrarExperiencias;