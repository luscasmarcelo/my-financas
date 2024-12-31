import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    if (!currentUser) {
        router.push('/login');
        return null;
    }

    return children;
};

export default PrivateRoute;