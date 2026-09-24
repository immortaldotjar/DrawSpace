import React from 'react'


import NavBar from '../components/NavBar';
import Hero from '../components/HomeComps/Hero';
import { useNavigate } from 'react-router';

const Home = ({ onEnter }) => {
    const navigate = useNavigate()

    const handleStart = () => {
        onEnter();
        navigate("/board");
    }

    return (
        <div className="min-h-screen bg-brand p-3 md:p-4">
            <div className="bg-brand rounded-4xl p-4 md:p-6">

                <NavBar onStart={handleStart} />
                <Hero />
            </div>
        </div>

    );
};

export default Home;