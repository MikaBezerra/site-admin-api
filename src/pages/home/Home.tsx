import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from './home.module.css';
import Title from '../../components/common/title';
import api from '../../services/api';

const Home: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [experiencias, setExperiencias] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseExperiencias = await api.get('/experiencias');
        const responsePortfolios = await api.get('/portfolios');
        setExperiencias(responseExperiencias.data);
        setPortfolios(responsePortfolios.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  const experienciasProfissionais = experiencias.filter(
    (experiencia: any) => experiencia.tipo === 'profissional'
  ).length;

  const experienciasAcademicas = experiencias.filter(
    (experiencia: any) => experiencia.tipo === 'academico'
  ).length;

  const portfoliosLength = portfolios.length;
  useEffect(() => {
    if (chartRef.current && experiencias.length > 0 && portfolios.length > 0) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Experiências Profissionais', 'Experiências Acadêmicas', 'Portfólios'],
          datasets: [
            {
              label: 'Gráfico que representa a quantidade de informações cadastradas no site.',
              data: [experienciasProfissionais, experienciasAcademicas, portfoliosLength],
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
  }, [chartRef, experiencias, experienciasProfissionais, experienciasAcademicas, portfolios, portfoliosLength]);

  return (
    <>
      <div className={styles.title}>
        <Title level="h1">Seja bem-vindo!</Title>
        <p>Esta é nossa página inicial. Navegue pelo menu lateral!</p>
      </div>

      <div className={styles.graphic}>
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

export default Home;