import React from 'react';

const SignUpForm = () => {
    return (
        <form>
            <input type="text" placeholder="Username..."/>
            <input type="password" placeholder="Password..."/>
            <input type="password" placeholder="Retype Password..."/>
            <button>Sign Up</button>
        </form>
    );
};

export default SignUpForm;