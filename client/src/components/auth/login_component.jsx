import React from 'react';

const Login = () => {
    return (
        <div className="loginFormWrapper">
            <form>
                <input type="text" placeholder="Username..."/>
                <input type="password" placeholder="Password..."/>
                <button>Log In</button>
            </form>
        </div>
    );
};

export default Login;