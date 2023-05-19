import api from './api.js';

export interface Portfolio {
    id: number;
    link: string;
    image: string;
    title: string;
}

export const createPortfolio = async (portfolio: Portfolio ) => {
    const response = await api.post('/portfolios', portfolio);
    return response.data;
}

export const getPortfolio = async () => {
    const response = await api.get('/portfolios');
    return response.data;
}

export const getPortfolioById = async (id: number) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
}

export const updatePortfolio = async (portfolio: Portfolio ) => {
    const response = await api.put(`/portfolios/${portfolio.id}`, portfolio);
    return response.data;
}

export const deletePortfolio = async (id: number) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
}

export const createOrUpdatePortfolio = async (portfolio: Portfolio) => {
    if (portfolio.id === 0) {
        return await createPortfolio(portfolio);
    } else {
        return await updatePortfolio(portfolio);
    }
}
