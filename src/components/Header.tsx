import React from 'react';
import logoImg from '../assets/quiz-1.jpg';

const Header: React.FC = () => {
    return (
        <header>
            <img src={logoImg} alt={"Quiz Logo"} />
            <h1>TeQuiz</h1>
        </header>
    )
}

export default Header;