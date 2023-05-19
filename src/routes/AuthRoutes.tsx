import React from "react";

import Layout from "../components/layout";

import Home from '../pages/home';
import CadastrarInformacoes from '../pages/curriculo/cadastrarInformacoes';
import CadastrarExperiencias from '../pages/curriculo/cadastrarexperiencias';
import ListarExperiencias from '../pages/curriculo/listarexperiencias';
import CadastrarPortfolio from '../pages/portfolio/cadastrarportfolio';
import ListaPortfolio from '../pages/portfolio/listaPortfolio';
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";





const AppRoutes: React.FC = () => {
    const { authenticated, isLoading } = useAuth();

    if(isLoading) {
        return <p>Carregando...</p>;
    }

    if(!authenticated) {
        return <Navigate to = "/login" />
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/curriculo/informacoes/cadastro" element={<CadastrarInformacoes />} />
                <Route path="/curriculo/experiencia/cadastro" element={<CadastrarExperiencias />} />
                <Route path="/curriculo/experiencia/lista" element={<ListarExperiencias />} />
                <Route path="/portfolio/cadastro" element={<CadastrarPortfolio />} />
                <Route path="/portfolio/lista" element={<ListaPortfolio />} />
            </Routes>
        </Layout>
    );
};

export default AppRoutes;