import React, { useState } from 'react';
import './App.css';
import generateRandomNumber from './generateRandomNumber'; // Импортируйте функцию генерации коэффициента

const loadingGif = 'XDZT.gif'; // Путь к вашему GIF файлу
const headerImage = 'tg.png'; // Путь к вашему изображению для замены подписи
const defaultImage = 'basic.png'; // Путь к изображению по умолчанию

function App() {
    const [image, setImage] = useState(defaultImage);
    const [loading, setLoading] = useState(false);
    const [coefficient, setCoefficient] = useState(0);

    const getResult = () => {
        setImage(null); // Убираем предыдущее изображение
        setLoading(true);
        setCoefficient(0);

        const startLoadingTime = Date.now();
        const targetCoefficient = generateRandomNumber(); // Генерация нового коэффициента

        const interval = setInterval(() => {
            const elapsedTime = (Date.now() - startLoadingTime) / 3000;
            setCoefficient(Math.min(elapsedTime * targetCoefficient, targetCoefficient));
        }, 100);

        setTimeout(() => {
            setLoading(false);
            setImage(defaultImage); // Возвращаем изображение по умолчанию после загрузки
            clearInterval(interval);
        }, 3000); // Задержка для анимации загрузки
    };

    return (
        <div className="App">
            <div className="header">
                <div className="header-top">
                    <img src={headerImage} alt="Header" className="header-image" />
                    <span className="header-text">tg_marcus_top1</span>
                </div>
                <div className="header-text header-text-bold">MINES HACKER</div>
            </div>
            <div className="result-container">
                <div className="image-container">
                    {loading && (
                        <>
                            <img src={loadingGif} alt="Loading" className="loading-gif" />
                            <div className="coefficient">x {coefficient.toFixed(2)}</div>
                        </>
                    )}
                    {!loading && image && (
                        <img src={image} alt="Result" />
                    )}
                </div>
                {!loading && (
                    <button onClick={getResult}>
                        {loading || !image ? 'Рассчитать результат' : 'Получить прогноз'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
