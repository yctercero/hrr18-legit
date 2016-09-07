import React from 'react';

const SignUp = () => {
    return (
        <div className="signUpFormWrapper">
            <form>
                <input type="text" placeholder="Username..."/>
                <input type="password" placeholder="Password..."/>
                <input type="password" placeholder="Retype Password..."/>
                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;