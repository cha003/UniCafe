import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthWrapper = ({ children }) => {
    // Placeholder Client ID - User needs to replace this with theirs
    const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthWrapper;
