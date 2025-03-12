
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gym-dark text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Your Fitness Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gym-darker p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customize Your Workout</h2>
            {/* Content will be added in next iteration */}
          </div>
          <div className="bg-gym-darker p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Trainer Selected Workouts</h2>
            {/* Content will be added in next iteration */}
          </div>
          <div className="bg-gym-darker p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">28 Days Challenge</h2>
            {/* Content will be added in next iteration */}
          </div>
          <div className="bg-gym-darker p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
            {/* Content will be added in next iteration */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
