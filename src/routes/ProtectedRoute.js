import { Navigate } from "react-router"; // За пренасочване
import { useAuth } from "../contexts/AuthContext"; // Импорт на useAuth

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Проверка на логнатия потребител

  if (!user) {
    return Navigate ("/login"); // Пренасочване към логин ако няма потребител
  }

  return children; // Рендиране на защитеното съдържание
};

export default ProtectedRoute;
