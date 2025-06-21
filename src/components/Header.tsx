import React, {memo} from 'react';

const Header: React.FC = memo(() => {
    return (
        <header>
            <img src='/quiz-logo.jpg' alt={"Quiz Logo"} />
            <h1>TeQuiz</h1>
        </header>
    )
})

export default Header;