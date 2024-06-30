import { random } from 'mathjs';

const generateRandomNumber = (lowerBound = 1.1, upperBound = 16, peakLower = 1.4, peakUpper = 2.3) => {
    const beta = (alpha, beta) => {
        const u = Array.from({ length: alpha }, () => Math.random());
        const v = Array.from({ length: beta }, () => Math.random());
        return (
            u.reduce((a, b) => a * b, 1) /
            (u.reduce((a, b) => a * b, 1) + v.reduce((a, b) => a * b, 1))
        );
    };

    let randomNumber;
    do {
        // Generate a random number using the custom beta distribution
        randomNumber = beta(1, 5) * (upperBound - lowerBound) + lowerBound;
        // Check if the number is within the peak range
        if (randomNumber >= peakLower && randomNumber <= peakUpper) {
            if (Math.random() < 0.2) {
                return Number(randomNumber.toFixed(1));
            }
        }
    } while (true);
};

export default generateRandomNumber;
