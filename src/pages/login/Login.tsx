import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../services/authServices";
import { useAuth } from "../../contexts/AuthContext";
import Form from '../../components/forms/form/Form';
import Input from "../../components/forms/input/Input";
import Button from "../../components/common/button";
import Title from "../../components/common/title";
import styles from './login.module.css'

interface LoginValues {
    email: string;
    password: string;
}

const initialValues: LoginValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail obrigatório"),
    password: Yup.string()
        .min(6, "A senha deve conter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
});

const Login = () => {
    const navigate = useNavigate();
    const { login: handleLogin } = useAuth();

    const onSubmit = async (values: LoginValues) => {
        try {
            const user = await login(values);
            handleLogin(user);
            navigate("/");
            console.log(values);
        } catch (error) {
            console.log(error);
            alert("Erro ao fazer login");
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title level="h3">MEU SITE PESSOAL</Title>

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />
    
                        <Button type="submit">Login</Button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default Login;
