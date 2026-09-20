import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dumbbell } from 'lucide-react';

// Background video URL - can be configured via .env
const videoSrc = import.meta.env.VITE_VIDEO_URL || 'https://video.gumlet.io/67938e0d9adc85447fb611ad/67f43b72aac3d4fca78ab75d/download.mp4';

const Index = () => {
  const navigate = useNavigate();

  const handlePlanSelection = async (planType) => {
    if (planType === 'ai') {
        try {
            const aiServiceUrl = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:5001/';
            const response = await fetch(aiServiceUrl);
            if (response.ok) {
                window.location.href = aiServiceUrl;
            }
        } catch (error) {
            console.error('Connection failed:', error);
        }
    } else {
        navigate('/dashboard');
    }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white font-inherit overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute z-10 w-full h-full bg-black bg-opacity-70"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center space-y-8 bg-black bg-opacity-80 shadow-xl rounded-xl p-10 border border-gray-800 backdrop-blur-sm max-w-4xl mx-4">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">
          Transform Your Fitness Journey
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Get personalized workout plans tailored to your goals
        </p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 transition-colors"
            >
              <Dumbbell className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border border-gray-800 shadow-lg text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Choose Your Plan Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                onClick={() => handlePlanSelection('ai')}
                className="bg-white hover:bg-gray-200 text-black"
              >
                AI Generated Plan
              </Button>
              <Button
                onClick={() => handlePlanSelection('manual')}
                className="bg-white hover:bg-gray-200 text-black"
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