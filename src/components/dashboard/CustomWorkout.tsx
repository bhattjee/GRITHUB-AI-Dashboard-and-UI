
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem('customWorkoutPlan');
    return saved ? JSON.parse(saved) : [];
  });

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
    
    toast({
      title: "Workout plan created!",
      description: `Created a custom plan with ${selectedExercises.length} exercises`,
    });
  };

  return (
    <CardContent className="p-0">
      <ScrollArea className="h-[400px] pr-4">
        <div className="p-4 space-y-6">
          {Object.entries(muscleGroups).map(([muscle, exercises]) => (
            <div key={muscle} className="rounded-lg bg-black/20 p-4">
              <h3 className="text-lg font-semibold mb-3 capitalize flex items-center">
                <Dumbbell className="h-4 w-4 mr-2 text-gym-accent" />
                {muscle}
              </h3>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <div key={exercise.id} 
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                      selectedExercises.some(e => e.id === exercise.id) 
                        ? 'bg-gym-accent/20 border border-gym-accent/30' 
                        : 'hover:bg-black/20'
                    }`}>
                    <Checkbox
                      id={exercise.id}
                      checked={selectedExercises.some(e => e.id === exercise.id)}
                      onCheckedChange={() => handleExerciseToggle(exercise)}
                      className="mt-0.5"
                    />
                    <div>
                      <label htmlFor={exercise.id} className="font-medium cursor-pointer flex items-center">
                        {exercise.name}
                        {selectedExercises.some(e => e.id === exercise.id) && (
                          <CheckCircle className="h-4 w-4 ml-2 text-gym-accent" />
                        )}
                      </label>
                      <p className="text-sm text-gray-400">{exercise.description}</p>
                      <p className="text-sm text-gray-400">Sets: {exercise.sets} | Reps: {exercise.reps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 pt-0 mt-4">
        <Button 
          onClick={generateCustomPlan}
          className="w-full bg-gym-accent hover:bg-gym-accent/90 font-semibold"
        >
          Generate Custom Plan
          <Dumbbell className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  );
};

export default CustomWorkout;
