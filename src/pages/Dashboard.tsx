
import React from 'react';
import CustomWorkout from '@/components/dashboard/CustomWorkout';
import TrainerWorkouts from '@/components/dashboard/TrainerWorkouts';
import WorkoutChallenge from '@/components/dashboard/WorkoutChallenge';
import ProfileManagement from '@/components/dashboard/ProfileManagement';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gym-dark text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Your Fitness Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomWorkout />
          <TrainerWorkouts />
          <WorkoutChallenge />
          <ProfileManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
