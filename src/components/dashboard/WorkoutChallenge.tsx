
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Calendar as CalendarIcon, CheckCircle2, Flame } from 'lucide-react';

const generateWorkoutPlan = (type: 'weight-loss' | 'muscle-gain') => {
  const days = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    completed: false,
    muscle: i % 7 === 0 ? 'Chest' : i % 7 === 1 ? 'Back' : i % 7 === 2 ? 'Legs' : i % 7 === 3 ? 'Shoulders' : i % 7 === 4 ? 'Arms' : i % 7 === 5 ? 'Core' : 'Rest',
    exercises: i % 7 !== 6 ? [
      { name: `Exercise 1`, sets: 3, reps: type === 'weight-loss' ? '15-20' : '8-12', description: 'Exercise description', safety: 'Safety tips' },
      { name: `Exercise 2`, sets: 3, reps: type === 'weight-loss' ? '15-20' : '8-12', description: 'Exercise description', safety: 'Safety tips' },
      { name: `Exercise 3`, sets: 3, reps: type === 'weight-loss' ? '15-20' : '8-12', description: 'Exercise description', safety: 'Safety tips' },
      { name: `Exercise 4`, sets: 3, reps: type === 'weight-loss' ? '15-20' : '8-12', description: 'Exercise description', safety: 'Safety tips' },
      { name: `Exercise 5`, sets: 3, reps: type === 'weight-loss' ? '15-20' : '8-12', description: 'Exercise description', safety: 'Safety tips' },
    ] : [],
  }));

  return days;
};

const WorkoutChallenge = () => {
  const [workoutType, setWorkoutType] = useState<'weight-loss' | 'muscle-gain'>('weight-loss');
  const [showDialog, setShowDialog] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const savedPlan = localStorage.getItem('workoutChallengePlan');
    const savedType = localStorage.getItem('workoutChallengeType') as 'weight-loss' | 'muscle-gain' | null;
    
    if (savedPlan && savedType) {
      setWorkoutType(savedType);
      return JSON.parse(savedPlan);
    }
    
    return generateWorkoutPlan('weight-loss');
  });
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('workoutChallengeStreak');
    return savedStreak ? parseInt(savedStreak) : 0;
  });

  const handleTypeChange = (checked: boolean) => {
    setShowDialog(true);
  };

  const confirmTypeChange = () => {
    const newType = workoutType === 'weight-loss' ? 'muscle-gain' : 'weight-loss';
    setWorkoutType(newType);
    const newPlan = generateWorkoutPlan(newType);
    setWorkoutPlan(newPlan);
    setStreak(0);
    localStorage.setItem('workoutChallengeType', newType);
    localStorage.setItem('workoutChallengePlan', JSON.stringify(newPlan));
    localStorage.setItem('workoutChallengeStreak', '0');
    setShowDialog(false);
  };

  const toggleDayCompletion = (dayIndex: number) => {
    setWorkoutPlan(prev => {
      const newPlan = [...prev];
      newPlan[dayIndex] = { ...newPlan[dayIndex], completed: !newPlan[dayIndex].completed };
      
      // Update local storage
      localStorage.setItem('workoutChallengePlan', JSON.stringify(newPlan));
      
      return newPlan;
    });

    // Update streak
    const completedDays = workoutPlan.filter(day => day.completed).length + (workoutPlan[dayIndex].completed ? -1 : 1);
    setStreak(completedDays);
    localStorage.setItem('workoutChallengeStreak', completedDays.toString());
  };

  return (
    <CardContent className="p-0">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between bg-black/30 rounded-lg p-3 border border-gray-800">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">{workoutType === 'weight-loss' ? 'Weight Loss' : 'Muscle Gain'} Challenge</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${workoutType === 'weight-loss' ? 'text-white' : 'text-gray-500'}`}>Weight Loss</span>
            <Switch checked={workoutType === 'muscle-gain'} onCheckedChange={handleTypeChange} className="data-[state=checked]:bg-gym-accent" />
            <span className={`text-sm ${workoutType === 'muscle-gain' ? 'text-white' : 'text-gray-500'}`}>Muscle Gain</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 order-2 md:order-1">
            <Accordion type="single" collapsible className="bg-black/20 rounded-lg border border-gray-800">
              {workoutPlan.map((day, index) => (
                <AccordionItem key={index} value={`day-${index + 1}`} className="border-b border-gray-800 last:border-0">
                  <AccordionTrigger className="px-4 py-3 hover:bg-black/20">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={day.completed}
                        onCheckedChange={() => toggleDayCompletion(index)}
                        className="h-5 w-5 data-[state=checked]:bg-gym-accent data-[state=checked]:text-white"
                      />
                      <span className="flex items-center">
                        <span className={`mr-2 ${day.completed ? 'line-through text-gray-500' : ''}`}>
                          Day {day.day}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${day.completed ? 'bg-gym-accent/30 text-gym-accent' : 'bg-gray-800 text-gray-300'}`}>
                          {day.muscle}
                        </span>
                        {day.completed && <CheckCircle2 className="h-4 w-4 ml-2 text-gym-accent" />}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 bg-black/10">
                    {day.exercises.length > 0 ? (
                      <div className="space-y-3 py-2">
                        {day.exercises.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="bg-black/30 p-3 rounded-lg border border-gray-800">
                            <h4 className="font-medium text-white">{exercise.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-1.5">
                              <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">Sets: {exercise.sets}</span>
                              <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">Reps: {exercise.reps}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{exercise.description}</p>
                            <p className="text-xs text-yellow-500/80 mt-2 flex items-center">
                              <span className="mr-1">⚠️</span> {exercise.safety}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-2 text-center text-gray-500">Rest day</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="space-y-4 order-1 md:order-2 md:w-[280px]">
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800 flex flex-col items-center">
              <div className="relative">
                <Trophy className="w-12 h-12 text-yellow-500" />
                <div className="absolute -top-1 -right-1 bg-gym-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {streak}
                </div>
              </div>
              <h3 className="text-xl font-bold mt-2">Current Streak</h3>
              <div className="flex items-center mt-1 text-gray-400">
                <Flame className="h-4 w-4 mr-1 text-red-500" />
                <span>{streak} days completed</span>
              </div>
            </div>
            
            <div className="bg-black/30 p-3 rounded-lg border border-gray-800">
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-4 w-4 mr-2 text-gym-accent" />
                <h4 className="font-medium">Progress Calendar</h4>
              </div>
              <Calendar
                mode="multiple"
                selected={workoutPlan.filter(day => day.completed).map((_, i) => new Date(2024, 0, i + 1))}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-[#1e1e1e] border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Workout Type?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your current progress. Are you sure you want to switch to {workoutType === 'weight-loss' ? 'muscle gain' : 'weight loss'} mode?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 text-white border-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmTypeChange} className="bg-gym-accent hover:bg-gym-accent/90">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  );
};

export default WorkoutChallenge;
