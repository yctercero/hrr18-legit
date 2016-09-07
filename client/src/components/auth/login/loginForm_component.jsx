import React from 'react';

const LoginForm = () => {
    return (
        <form>
            <input type="text" placeholder="Username..."/>
            <input type="password" placeholder="Password..."/>
            <button>Log In</button>
        </form>
    );
};

export default LoginForm;