
import React from 'react';
import { LayoutDashboard, Dumbbell, Trophy, UserCircle2 } from 'lucide-react';
import CustomWorkout from '@/components/dashboard/CustomWorkout';
import TrainerWorkouts from '@/components/dashboard/TrainerWorkouts';
import WorkoutChallenge from '@/components/dashboard/WorkoutChallenge';
import ProfileManagement from '@/components/dashboard/ProfileManagement';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <LayoutDashboard className="h-8 w-8 text-gym-accent" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Your Fitness Dashboard
            </h1>
          </div>
          <p className="text-gray-400">Track your progress, customize workouts, and reach your fitness goals</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#1e1e1e] to-[#151515] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center space-x-2 p-4 border-b border-gray-800 bg-black/30">
              <Dumbbell className="h-5 w-5 text-gym-accent" />
              <h2 className="text-xl font-semibold">Custom Workout</h2>
            </div>
            <CustomWorkout />
          </div>
          
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#1e1e1e] to-[#151515] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center space-x-2 p-4 border-b border-gray-800 bg-black/30">
              <Dumbbell className="h-5 w-5 text-gym-accent" />
              <h2 className="text-xl font-semibold">Trainer Workouts</h2>
            </div>
            <TrainerWorkouts />
          </div>
          
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#1e1e1e] to-[#151515] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center space-x-2 p-4 border-b border-gray-800 bg-black/30">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">28 Days Challenge</h2>
            </div>
            <WorkoutChallenge />
          </div>
          
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#1e1e1e] to-[#151515] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center space-x-2 p-4 border-b border-gray-800 bg-black/30">
              <UserCircle2 className="h-5 w-5 text-gym-accent" />
              <h2 className="text-xl font-semibold">Profile Management</h2>
            </div>
            <ProfileManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
