import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('jwt='))?.split('=')[1];

    if (!token) {
        return <Navigate to="/sign-in" />;
    }

    const decodedToken: any = jwtDecode(token);

    if (!allowedRoles.includes(decodedToken.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
