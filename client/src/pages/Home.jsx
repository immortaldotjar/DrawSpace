import React from 'react'


import NavBar from '../components/NavBar';
import Hero from '../components/HomeComps/Hero';


const Home = () => {
    return (
        <div className="min-h-screen bg-brand p-3 md:p-4">
            <div className="bg-brand rounded-4xl p-4 md:p-6">

                <NavBar />
                <Hero />
            </div>
        </div>

    );
};

export default Home;