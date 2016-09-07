import React from 'react';

//Components
import UnauthHeader from '../../headers/unauthorized_header.jsx';
import SignUpForm from './signupForm_component.jsx';

const SignUp = () => {
    return (
        <div>
            <UnauthHeader />
            <main>
                 <div className="signUpFormWrapper">
                    <SignUpForm />
                </div>
            </main>
        </div>
    );
};

export default SignUp;