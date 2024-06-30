import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [coefficient, setCoefficient] = useState(null);
    const [targetCoefficient, setTargetCoefficient] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [gifAnimation, setGifAnimation] = useState(false);

    const generateCoefficient = () => {
        let randomNumbers = [];
        while (randomNumbers.length < 1) {
            const x = Math.random() * (8 - 1.1) + 1.1;
            if (x >= 1.4 && x <= 2.3) {
                randomNumbers.push(x);
            }
            if (Math.random() < 0.2) {
                randomNumbers.push(x);
            }
        }
        return Number(randomNumbers[0].toFixed(1));
    };

    const handleClick = () => {
        setLoading(true);
        const target = generateCoefficient();
        setTargetCoefficient(target);

        let start = 0;
        const interval = setInterval(() => {
            start += 0.01;
            if (start >= target) {
                clearInterval(interval);
                setCoefficient(target.toFixed(2));
                setLoading(false);
                setGifAnimation(false); // Остановка анимации гифки
            } else {
                setCoefficient(start.toFixed(2));
            }
        }, 30);

        setGifAnimation(true); // Запуск анимации гифки
    };

    useEffect(() => {
        if (coefficient === targetCoefficient) {
            setGifAnimation(false); // Остановка анимации гифки при достижении цели
        }
    }, [coefficient, targetCoefficient]);

    return (
        <div className="App">
            <div className="header">
                <div className="header-top">
                    <img src="/tg.png" alt="Header" className="header-image" />
                    <span className="header-text">tg_marcus_top1</span>
                </div>
                <div className="header-text-bold">MINES HACKER</div>
            </div>
            <div className="result-container">
                <div className="image-container">
                    <div className={`coefficient ${coefficient !== null ? '' : 'hidden'}`}>
                        {`x ${coefficient || '0.00'}`}
                    </div>
                    <div className={`default-image ${imageLoaded ? 'hidden' : ''}`}>
                        <img
                            src="/basic.png"
                            alt="Default"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    {gifAnimation && (
                        <div className="gif-animation">
                            <img src="/loading.gif" alt="Loading" className="loading-gif" />
                        </div>
                    )}
                </div>
            </div>
            {!loading && (
                <button onClick={handleClick}>
                    {coefficient === null ? 'Рассчитать результат' : 'Получить прогноз'}
                </button>
            )}
        </div>
    );
};

export default App;
