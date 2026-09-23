import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home.jsx";
import Board from "./pages/Board.jsx";
import { useVisit } from "./context/VisitContext.jsx";

const App = () => {
  const { isFirstVisit, markVisited } = useVisit();

  if (isFirstVisit === null) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isFirstVisit ? (
            <Home onEnter={markVisited} />
          ) : (
            <Navigate to="/board" replace />
          )
        }
      />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
};

export default App;