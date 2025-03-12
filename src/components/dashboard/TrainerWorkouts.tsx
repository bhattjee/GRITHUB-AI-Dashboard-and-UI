
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const predefinedWorkouts = [
  {
    name: "Full Body Power",
    exercises: [
      { name: "Squats", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Bench Press", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Deadlifts", sets: 4, reps: 8, weight: "70-80% 1RM" },
    ]
  },
  {
    name: "Upper Body Focus",
    exercises: [
      { name: "Pull-ups", sets: 4, reps: "8-12" },
      { name: "Military Press", sets: 4, reps: 10, weight: "60-70% 1RM" },
      { name: "Dips", sets: 3, reps: "10-15" },
    ]
  },
  // ... more workouts
];

const TrainerWorkouts = () => {
  return (
    <Card className="bg-gym-darker border-none">
      <CardHeader>
        <CardTitle>Trainer Selected Workouts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {predefinedWorkouts.map((workout, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{workout.name}</h3>
              <div className="space-y-4">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="bg-black/20 p-4 rounded-lg">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-gray-400">
                      Sets: {exercise.sets} | Reps: {exercise.reps}
                      {exercise.weight && ` | Weight: ${exercise.weight}`}
                    </p>
                  </div>
                ))}
              </div>
              {index < predefinedWorkouts.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TrainerWorkouts;
