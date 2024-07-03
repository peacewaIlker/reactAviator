import React, { useState, useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp


const App = () => {
    const [loading, setLoading] = useState(false);
    const [coefficient, setCoefficient] = useState(null);
    const [targetCoefficient, setTargetCoefficient] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [gifAnimation, setGifAnimation] = useState(false);
    const [gifLoaded, setGifLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = "/aviator300.gif";
        img.onload = () => {
            tg.ready()
            tg.expand()
        };

    }, []);

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
        return Number(randomNumbers[0].toFixed(2));
    };

    const handleClick = () => {
        setLoading(true);
        const target = generateCoefficient();
        setTargetCoefficient(target);

        let start = 1;
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
        }, 10);

        setGifAnimation(true); // Запуск анимации гифки
    };





    return (
        <div className="App">
            <div className="header">
                <div className="header-top">
                    <img src="/tg.png" alt="Header" className="header-image" />
                    <span className="header-text">tg_marcus_top1</span>
                </div>
                <div className="header-text-bold">AVIATOR HACKER</div>
            </div>
            <div className="result-container">
                <div className="image-container">
                    {loading ? (
                        <>
                            <img
                                src='/aviator300.gif'
                                alt="Loading"
                                className="gif"
                            />

                            <div className={`coefficient`}>
                                {`x ${coefficient || 0.00}`}
                            </div>
                        </>
                    ) : (
                        coefficient !== null ? (
                            <div className="coefficientAnimate">{`x ${coefficient}`}</div>
                        ) : (
                            <img
                                src='/aviator.png'
                                alt="Loading"
                                className="gif"
                            />
                        )

                    )}
                </div>
            </div>
            {!loading && (
                <button onClick={handleClick}>
                    {coefficient === null ? 'START HACKING' : 'GET SIGNAL'}
                </button>
            )}
        </div>
    );
};

export default App;
