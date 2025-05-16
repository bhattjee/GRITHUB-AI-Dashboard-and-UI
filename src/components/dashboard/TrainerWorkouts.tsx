import React from 'react';
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dumbbell, ArrowRight } from 'lucide-react';

const predefinedWorkouts = [
  {
    name: "Full Body Power",
    exercises: [
      { name: "Squats", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Bench Press", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Deadlifts", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Overhead Press", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Pull-Ups", sets: 4, reps: 8, weight: "Bodyweight or Weighted" },
      { name: "Barbell Rows", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Lunges", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Dumbbell Shoulder Press", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Lat Pulldowns", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Leg Press", sets: 4, reps: 8, weight: "70-80% 1RM" },
      { name: "Dips", sets: 4, reps: 8, weight: "Bodyweight or Weighted" },
      { name: "Calf Raises", sets: 4, reps: 12, weight: "70-80% 1RM" },
      { name: "Bicep Curls", sets: 4, reps: 12, weight: "70-80% 1RM" },
      { name: "Tricep Extensions", sets: 4, reps: 12, weight: "70-80% 1RM" },
      { name: "Plank", sets: 4, reps: "60 seconds", weight: "Bodyweight" },
      { name: "Russian Twists", sets: 4, reps: 20, weight: "Bodyweight" },
      { name: "Hanging Leg Raises", sets: 4, reps: 12, weight: "Bodyweight" }
    ]
  }, 
  {
    "name": "Upper Body Focus",
    "exercises": [
      { "name": "Pull-ups", "sets": 4, "reps": "8-12" },
      { "name": "Military Press", "sets": 4, "reps": 10, "weight": "60-70% 1RM" },
      { "name": "Dips", "sets": 3, "reps": "10-15" },
      { "name": "Bent Over Rows", "sets": 4, "reps": 10, "weight": "70-80% 1RM" },
      { "name": "Push-Ups", "sets": 4, "reps": "12-15", "weight": "Bodyweight" },
      { "name": "Incline Bench Press", "sets": 4, "reps": 10, "weight": "60-70% 1RM" },
      { "name": "Face Pulls", "sets": 4, "reps": 12, "weight": "Light" },
      { "name": "Lateral Raises", "sets": 4, "reps": 12, "weight": "Light" },
      { "name": "Shrugs", "sets": 4, "reps": 10, "weight": "70-80% 1RM" },
      { "name": "Tricep Pushdowns", "sets": 4, "reps": 12, "weight": "Moderate" }
    ]
  },
  {
    "name": "Lower Body & Core",
    "exercises": [
      { "name": "Leg Press", "sets": 4, "reps": 12, "weight": "60-70% 1RM" },
      { "name": "Lunges", "sets": 3, "reps": "10 each leg" },
      { "name": "Plank", "sets": 3, "reps": "30-60 sec" },
      { "name": "Deadlifts", "sets": 4, "reps": 8, "weight": "70-80% 1RM" },
      { "name": "Calf Raises", "sets": 4, "reps": 12, "weight": "70-80% 1RM" },
      { "name": "Leg Curls", "sets": 4, "reps": 10, "weight": "60-70% 1RM" },
      { "name": "Step-Ups", "sets": 3, "reps": "10 each leg", "weight": "Bodyweight or Weighted" },
      { "name": "Hip Thrusts", "sets": 4, "reps": 12, "weight": "70-80% 1RM" },
      { "name": "Russian Twists", "sets": 4, "reps": 20, "weight": "Bodyweight" },
      { "name": "Hanging Leg Raises", "sets": 4, "reps": 12, "weight": "Bodyweight" }
    ]
  },
  {
    "name": "Running and Cardio",
    "exercises": [
      { "name": "Treadmill Running", "sets": 4, "reps": "10 minutes at moderate pace, 5 minutes at fast pace" },
      { "name": "Jump Rope", "sets": 4, "reps": "2 minutes, 30 seconds rest" },
      { "name": "Stationary Bike", "sets": 4, "reps": "10 minutes at moderate resistance" },
      { "name": "Rowing Machine", "sets": 4, "reps": "10 minutes at moderate resistance" },
      { "name": "High Knees", "sets": 4, "reps": "1 minute, 30 seconds rest" },
      { "name": "Stair Climber", "sets": 4, "reps": "10 minutes at moderate pace" },
      { "name": "Elliptical Trainer", "sets": 4, "reps": "10 minutes at moderate resistance" },
      { "name": "Outdoor Running", "sets": 4, "reps": "20 minutes at varied pace" },
      { "name": "Box Jumps", "sets": 4, "reps": "1 minute, 30 seconds rest" },
      { "name": "Battle Ropes", "sets": 4, "reps": "1 minute, 30 seconds rest" }
    ]
  }  
];

const TrainerWorkouts = () => {
  return (
    <CardContent className="p-0">
      <ScrollArea className="h-[600px]">  {/* Increased height */}
        <div className="p-4 space-y-6">
          {predefinedWorkouts.map((workout, index) => (
            <div key={index} className="rounded-lg bg-black/20 p-4 border border-gray-800 hover:border-gray-700 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                <Dumbbell className="h-5 w-5 mr-2 text-gym-accent" />
                {workout.name}
              </h3>
              <div className="space-y-4">
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="bg-black/30 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-all hover:translate-x-1">
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-gym-accent" />
                      <h4 className="font-medium text-white">{exercise.name}</h4>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      <span className="inline-block bg-gray-800 px-2 py-0.5 rounded mr-2">Sets: {exercise.sets}</span>
                      <span className="inline-block bg-gray-800 px-2 py-0.5 rounded mr-2">Reps: {exercise.reps}</span>
                      {exercise.weight && <span className="inline-block bg-gray-800 px-2 py-0.5 rounded">Weight: {exercise.weight}</span>}
                    </p>
                  </div>
                ))}
              </div>
              {index < predefinedWorkouts.length - 1 && <Separator className="my-4 bg-gray-800" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  );
};

export default TrainerWorkouts;
