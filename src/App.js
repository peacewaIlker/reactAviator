import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import generateRandomNumber from './generateRandomNumber'; // Импортируйте функцию генерации коэффициента

const loadingGif = 'XDZT.gif'; // Путь к вашему GIF файлу
const headerImage = 'header-image.jpg'; // Путь к вашему изображению для замены подписи
const defaultImage = 'default-image.jpg'; // Путь к изображению по умолчанию

function App() {
    const [image, setImage] = useState(defaultImage);
    const [loading, setLoading] = useState(false);
    const [coefficient, setCoefficient] = useState(null);
    const [targetCoefficient, setTargetCoefficient] = useState(null);
    const requestRef = useRef();

    const incrementCoefficient = (startTime, duration) => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = elapsed / duration;
        const currentCoefficient = Math.min(progress * targetCoefficient, targetCoefficient);
        setCoefficient(currentCoefficient);
        if (currentCoefficient < targetCoefficient) {
            requestRef.current = requestAnimationFrame(() => incrementCoefficient(startTime, duration));
        } else {
            setLoading(false);
            cancelAnimationFrame(requestRef.current);
        }
    };

    const getResult = () => {
        setImage(null); // Убираем предыдущее изображение
        setLoading(true);
        setCoefficient(0);

        const newCoefficient = generateRandomNumber(); // Генерация нового коэффициента
        setTargetCoefficient(newCoefficient);
        const startTime = Date.now();
        const duration = 3; // Длительность анимации в секундах

        requestRef.current = requestAnimationFrame(() => incrementCoefficient(startTime, duration));
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
                            <div className="coefficient">x {coefficient !== null ? coefficient.toFixed(2) : ''}</div>
                        </>
                    )}
                    {!loading && image && (
                        <>
                            <div className="coefficient">x {targetCoefficient !== null ? targetCoefficient.toFixed(2) : ''}</div>
                            <img src={image} alt="Result" />
                        </>
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
