import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkRole = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user/verify', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const { role } = await response.json();
                    if (allowedRoles.includes(role)) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('Error verifying role:', error);
                setIsAuthorized(false);
            }
        };

        checkRole();
    }, [allowedRoles]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;  // Loading state until the role is verified
    }

    if (!isAuthorized) {
        return <Navigate to="/sign-in" />;  // Redirect to login if unauthorized
    }

    return children;
};

export default ProtectedRoute;
