
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
};

const muscleGroups = {
  chest: [
    { id: '1', name: 'Bench Press', description: 'Flat bench barbell press', sets: 4, reps: 12 },
    { id: '2', name: 'Incline Dumbbell Press', description: 'Upper chest focused press', sets: 3, reps: 12 },
    // ... more exercises
  ],
  back: [
    { id: '3', name: 'Pull-ups', description: 'Bodyweight back exercise', sets: 4, reps: 10 },
    { id: '4', name: 'Bent Over Rows', description: 'Barbell back exercise', sets: 3, reps: 12 },
    // ... more exercises
  ],
  // ... more muscle groups
};

const CustomWorkout = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const handleExerciseToggle = (exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.find(e => e.id === exercise.id);
      if (isSelected) {
        return prev.filter(e => e.id !== exercise.id);
      }
      return [...prev, exercise];
    });
  };

  const generateCustomPlan = () => {
    // Save to local storage
    localStorage.setItem('customWorkoutPlan', JSON.stringify(selectedExercises));
  };

  return (
    <Card className="bg-gym-darker border-none">
      <CardHeader>
        <CardTitle>Customize Your Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {Object.entries(muscleGroups).map(([muscle, exercises]) => (
            <div key={muscle} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 capitalize">{muscle}</h3>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={exercise.id}
                      checked={selectedExercises.some(e => e.id === exercise.id)}
                      onCheckedChange={() => handleExerciseToggle(exercise)}
                    />
                    <div>
                      <label htmlFor={exercise.id} className="font-medium cursor-pointer">
                        {exercise.name}
                      </label>
                      <p className="text-sm text-gray-400">{exercise.description}</p>
                      <p className="text-sm text-gray-400">Sets: {exercise.sets} | Reps: {exercise.reps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
        <Button 
          onClick={generateCustomPlan}
          className="mt-4 w-full bg-gym-accent hover:bg-gym-accent/90"
        >
          Generate Custom Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomWorkout;
