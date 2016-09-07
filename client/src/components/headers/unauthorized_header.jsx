// Header shown at log in and sign up screen
import React from 'react';

const UnauthHeader = () => {
    return (
        <header>
            <div className="wrapper clearfix">
                <h1>
                    <img src="http://yadayadacreative.com/CDA/legitLogo.png" alt=""/>
                </h1>
                <nav className="clearfix">
                    <ul>
                        <li>
                            <a>
                                <i className="fa fa-info" aria-hidden="true"></i> 
                                About
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="fa fa-users" aria-hidden="true"></i> 
                                Team
                            </a>
                        </li>
                        <li>
                            <a href="/signup" className="button">
                                Sign Up
                            </a>
                        </li>
                        <li>
                            <a href="/signin" className="button">
                                Log In
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </header>
    );
};

export default UnauthHeader;