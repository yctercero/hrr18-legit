import React from 'react';

//Components
import UnauthHeader from './headers/unauthorized_header.jsx';
import LoginForm from './login/loginForm_component.jsx';

const Login = () => {
    return (
        <div>
            <UnauthHeader />
            <main>
                 <div className="loginFormWrapper">
                    <LoginForm />
                </div>
            </main>
        </div>
    );
};

export default Login;