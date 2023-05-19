import React from "react";

import styles from './cadastrarPortfolio.module.css';

import * as Yup from "yup";
import { Formik, Form } from "formik";
import Input from "../../../components/forms/input";

import { Portfolio, createOrUpdatePortfolio} from "../../../services/portfolioServices";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import Title from "../../../components/common/title/Title";

const initialValues: Portfolio = {
    id: 0,
    link: "",
    image: "",
    title: "",
};

const validationSchema = Yup.object().shape({
    link: Yup.string().required("Campo Obrigatório"),
    image: Yup.string().required("Campo Obrigatório"),
    title: Yup.string().required("Campo Obrigatório"),
});

const CadastrarPortfolio: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation(); 
    const portfolio = location.state as Portfolio;

    const onSubmit = async (values: Portfolio, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdatePortfolio(values);
            console.log(values);
            resetForm();
            navigate("/portfolio/lista");
            alert("Portfólio enviando com sucesso!");
        } catch (error) {
            console.log("Erro ao enviar portfólio.",error);
            alert("Erro ao enviar portfólio");
        }
    };

    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={portfolio || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <Title level="h2">Cadastrar Portfólio</Title>

                        <Input
                            label="Link"
                            name="link"
                            errors={errors.link}
                            touched={touched.link}
                        />

                        <Input
                            label="Imagem"
                            name="image"
                            errors={errors.image}
                            touched={touched.image}
                        />

                        <Input
                            label="Título"
                            name="title"
                            errors={errors.title}
                            touched={touched.title}
                        />

                        <Button type="submit">Enviar</Button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CadastrarPortfolio;