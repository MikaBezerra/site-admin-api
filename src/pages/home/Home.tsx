import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import data from '../../database/db.json';
import styles from './home.module.css';
import Title from '../../components/common/title';

type DataItem = {
    id: number;
    tipo: string;
};

const Home: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const experienciasProfissionais = data.experiencias.filter(
            (experiencia: DataItem) => experiencia.tipo === 'profissional'
        ).length;

        const experienciasAcademicas = data.experiencias.filter(
            (experiencia: DataItem) => experiencia.tipo === 'academico'
        ).length;

        const portfolios = data.portfolios.length;

        if (chartRef.current) {
            new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Experiências Profissionais', 'Experiências Acadêmicas', 'Portfólios'],
                    datasets: [
                        {
                            label: 'Gráfico que representa a quantidade de informações cadastradas no site.',
                            data: [experienciasProfissionais, experienciasAcademicas, portfolios],
                            backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                            },
                        },
                    },
                },
            });
        }
    }, []);

    return (
        <>
            <div className={styles.title}>
            <Title level='h1'>Seja bem vindo!</Title>
            <p>Esta é nossa página inicial. Navegue pelo menu lateral!</p>
            </div>

            <div className={styles.graphic}>
                <canvas ref={chartRef} />
            </div>
        </>
    );
};

export default Home;

