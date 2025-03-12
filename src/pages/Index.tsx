
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dumbbell } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (planType: 'ai' | 'manual') => {
    if (planType === 'ai') {
      navigate('/ai-plan');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gym-dark text-white">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Transform Your Fitness Journey
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Get personalized workout plans tailored to your goals
        </p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-gym-accent hover:bg-gym-accent/90">
              <Dumbbell className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gym-darker border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Choose Your Plan Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                onClick={() => handlePlanSelection('ai')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                AI Generated Plan
              </Button>
              <Button
                onClick={() => handlePlanSelection('manual')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Choose Manual Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
