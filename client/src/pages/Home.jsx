import NavBar from '../components/NavBar';
import Hero from '../components/HomeComps/Hero';
import { useNavigate } from 'react-router';

const Home = ({ onEnter }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onEnter();
    navigate("/board");
  };

  return (
    <div className="min-h-screen bg-brand frame">
      <div className="bg-brand surface frame">
        <NavBar onStart={handleStart} />
        <Hero onStart={handleStart} />
      </div>
    </div>
  );
};

export default Home