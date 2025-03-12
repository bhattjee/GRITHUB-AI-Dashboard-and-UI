
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const AIPlan = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gym-dark text-white">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Great choice!</h1>
        <p className="text-xl text-gray-400">This feature will be live soon.</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-gym-accent hover:bg-gym-accent/90"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default AIPlan;
