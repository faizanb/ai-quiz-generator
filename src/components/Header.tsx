import React, {memo} from 'react';
import logoImg from '../assets/quiz-logo.jpg';

const Header: React.FC = memo(() => {
    return (
        <header>
            <img src={logoImg} alt={"Quiz Logo"} />
            <h1>TeQuiz</h1>
        </header>
    )
})

export default Header;