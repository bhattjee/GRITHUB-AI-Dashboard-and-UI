
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy } from 'lucide-react';

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
  const [workoutPlan, setWorkoutPlan] = useState(() => generateWorkoutPlan('weight-loss'));
  const [streak, setStreak] = useState(0);

  const handleTypeChange = (checked: boolean) => {
    setShowDialog(true);
  };

  const confirmTypeChange = () => {
    const newType = workoutType === 'weight-loss' ? 'muscle-gain' : 'weight-loss';
    setWorkoutType(newType);
    setWorkoutPlan(generateWorkoutPlan(newType));
    setShowDialog(false);
  };

  const toggleDayCompletion = (dayIndex: number) => {
    setWorkoutPlan(prev => {
      const newPlan = [...prev];
      newPlan[dayIndex] = { ...newPlan[dayIndex], completed: !newPlan[dayIndex].completed };
      return newPlan;
    });

    // Update streak
    const completedDays = workoutPlan.filter(day => day.completed).length;
    setStreak(completedDays);
  };

  return (
    <Card className="bg-gym-darker border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>28 Days Challenge</CardTitle>
        <div className="flex items-center space-x-2">
          <span>Weight Loss</span>
          <Switch checked={workoutType === 'muscle-gain'} onCheckedChange={handleTypeChange} />
          <span>Muscle Gain</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <Accordion type="single" collapsible className="w-full">
              {workoutPlan.map((day, index) => (
                <AccordionItem key={index} value={`day-${index + 1}`}>
                  <AccordionTrigger className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={day.completed}
                        onCheckedChange={() => toggleDayCompletion(index)}
                        className="h-5 w-5"
                      />
                      <span>Day {day.day} - {day.muscle}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="p-4 mb-2 bg-black/20 rounded-lg">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-400">Sets: {exercise.sets} | Reps: {exercise.reps}</p>
                        <p className="text-sm text-gray-400">{exercise.description}</p>
                        <p className="text-sm text-gray-400 mt-2">⚠️ {exercise.safety}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="w-[300px] space-y-4">
            <div className="bg-black/20 p-4 rounded-lg text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="text-xl font-bold">Current Streak</h3>
              <p className="text-3xl font-bold text-gym-accent">{streak} days</p>
            </div>
            <Calendar
              mode="multiple"
              selected={workoutPlan.filter(day => day.completed).map((_, i) => new Date(2024, 0, i + 1))}
              className="rounded-md border"
            />
          </div>
        </div>
      </CardContent>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Workout Type?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your current progress. Are you sure you want to switch to {workoutType === 'weight-loss' ? 'muscle gain' : 'weight loss'} mode?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmTypeChange}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default WorkoutChallenge;
