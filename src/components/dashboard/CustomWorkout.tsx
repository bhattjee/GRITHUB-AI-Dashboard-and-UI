import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, CheckCircle, Bookmark, ArrowRight, Search, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number | string;
};

type MuscleGroups = {
  chest: Exercise[];
  back: Exercise[];
  legs: Exercise[];
  shoulders: Exercise[];
  arms: Exercise[];
  core: Exercise[];
  cardio: Exercise[];
};

type Workout = {
  name: string;
  exercises: Exercise[];
};

const muscleGroups: MuscleGroups = {
  chest: [
    { id: 'chest-1', name: 'Bench Press', description: 'Flat bench barbell press', sets: 4, reps: 12 },
    { id: 'chest-2', name: 'Incline Dumbbell Press', description: 'Upper chest focused press', sets: 3, reps: 12 },
    { id: 'chest-3', name: 'Decline Bench Press', description: 'Lower chest focused press', sets: 3, reps: 12 },
    { id: 'chest-4', name: 'Chest Flyes', description: 'Isolation movement for chest', sets: 3, reps: 15 },
    { id: 'chest-5', name: 'Push-ups', description: 'Bodyweight chest exercise', sets: 4, reps: '15-20' },
    { id: 'chest-6', name: 'Cable Crossovers', description: 'Cable isolation for inner chest', sets: 3, reps: 15 },
    { id: 'chest-7', name: 'Pec Deck Machine', description: 'Machine fly movement', sets: 3, reps: 12 },
    { id: 'chest-8', name: 'Dips', description: 'Lower chest bodyweight exercise', sets: 4, reps: 10 },
  ],
  back: [
    { id: 'back-1', name: 'Pull-ups', description: 'Bodyweight back exercise', sets: 4, reps: 10 },
    { id: 'back-2', name: 'Bent Over Rows', description: 'Barbell back exercise', sets: 3, reps: 12 },
    { id: 'back-3', name: 'Lat Pulldowns', description: 'Cable lat exercise', sets: 3, reps: 12 },
    { id: 'back-4', name: 'Seated Cable Rows', description: 'Cable rowing movement', sets: 3, reps: 12 },
    { id: 'back-5', name: 'T-Bar Rows', description: 'Focused mid-back exercise', sets: 3, reps: 10 },
    { id: 'back-6', name: 'Single-Arm Dumbbell Rows', description: 'Unilateral back exercise', sets: 3, reps: '12 each' },
    { id: 'back-7', name: 'Deadlifts', description: 'Compound back exercise', sets: 4, reps: 8 },
    { id: 'back-8', name: 'Face Pulls', description: 'Rear delt and upper back', sets: 3, reps: 15 },
  ],
  legs: [
    { id: 'legs-1', name: 'Squats', description: 'Compound leg exercise', sets: 4, reps: 10 },
    { id: 'legs-2', name: 'Leg Press', description: 'Machine compound movement', sets: 3, reps: 12 },
    { id: 'legs-3', name: 'Romanian Deadlifts', description: 'Hamstring focused exercise', sets: 3, reps: 12 },
    { id: 'legs-4', name: 'Lunges', description: 'Unilateral leg exercise', sets: 3, reps: '10 each' },
    { id: 'legs-5', name: 'Leg Extensions', description: 'Isolation for quadriceps', sets: 3, reps: 15 },
    { id: 'legs-6', name: 'Leg Curls', description: 'Isolation for hamstrings', sets: 3, reps: 15 },
    { id: 'legs-7', name: 'Calf Raises', description: 'Standing calf exercise', sets: 4, reps: 20 },
    { id: 'legs-8', name: 'Hack Squats', description: 'Machine quad-focused exercise', sets: 3, reps: 12 },
  ],
  shoulders: [
    { id: 'shoulders-1', name: 'Overhead Press', description: 'Compound shoulder exercise', sets: 4, reps: 10 },
    { id: 'shoulders-2', name: 'Lateral Raises', description: 'Side delt isolation', sets: 3, reps: 15 },
    { id: 'shoulders-3', name: 'Front Raises', description: 'Front delt isolation', sets: 3, reps: 15 },
    { id: 'shoulders-4', name: 'Rear Delt Flyes', description: 'Rear delt isolation', sets: 3, reps: 15 },
    { id: 'shoulders-5', name: 'Upright Rows', description: 'Compound shoulder movement', sets: 3, reps: 12 },
    { id: 'shoulders-6', name: 'Arnold Press', description: 'Rotational dumbbell press', sets: 3, reps: 12 },
    { id: 'shoulders-7', name: 'Cable Face Pulls', description: 'Rear delt and upper back', sets: 3, reps: 15 },
    { id: 'shoulders-8', name: 'Shrugs', description: 'Trapezius isolation', sets: 4, reps: 15 },
  ],
  arms: [
    { id: 'arms-1', name: 'Bicep Curls', description: 'Basic bicep isolation', sets: 4, reps: 12 },
    { id: 'arms-2', name: 'Tricep Pushdowns', description: 'Cable tricep isolation', sets: 4, reps: 12 },
    { id: 'arms-3', name: 'Hammer Curls', description: 'Neutral-grip bicep exercise', sets: 3, reps: 12 },
    { id: 'arms-4', name: 'Skull Crushers', description: 'Lying tricep extension', sets: 3, reps: 12 },
    { id: 'arms-5', name: 'Preacher Curls', description: 'Supported bicep isolation', sets: 3, reps: 12 },
    { id: 'arms-6', name: 'Overhead Tricep Extension', description: 'Stretched tricep isolation', sets: 3, reps: 12 },
    { id: 'arms-7', name: 'Concentration Curls', description: 'Seated bicep isolation', sets: 3, reps: 12 },
    { id: 'arms-8', name: 'Dips', description: 'Bodyweight tricep exercise', sets: 3, reps: 10 },
  ],
  core: [
    { id: 'core-1', name: 'Crunches', description: 'Basic ab exercise', sets: 3, reps: 20 },
    { id: 'core-2', name: 'Plank', description: 'Core stabilization', sets: 3, reps: '30-60 sec' },
    { id: 'core-3', name: 'Russian Twists', description: 'Rotational core exercise', sets: 3, reps: 20 },
    { id: 'core-4', name: 'Leg Raises', description: 'Lower ab focus', sets: 3, reps: 15 },
    { id: 'core-5', name: 'Ab Rollouts', description: 'Advanced core exercise', sets: 3, reps: 10 },
    { id: 'core-6', name: 'Mountain Climbers', description: 'Dynamic core exercise', sets: 3, reps: '30 sec' },
    { id: 'core-7', name: 'Side Planks', description: 'Oblique stabilization', sets: 3, reps: '30 sec each' },
    { id: 'core-8', name: 'Hanging Leg Raises', description: 'Advanced lower ab focus', sets: 3, reps: 12 },
  ],
  cardio: [
    { id: 'cardio-1', name: 'Treadmill Running', description: 'Basic cardio exercise', sets: 1, reps: '20-30 min' },
    { id: 'cardio-2', name: 'Cycling', description: 'Low impact cardio', sets: 1, reps: '20-30 min' },
    { id: 'cardio-3', name: 'Rowing', description: 'Full body cardio', sets: 1, reps: '15-20 min' },
    { id: 'cardio-4', name: 'Stair Climber', description: 'Lower body focused cardio', sets: 1, reps: '15-20 min' },
    { id: 'cardio-5', name: 'Jumping Rope', description: 'High intensity cardio', sets: 3, reps: '5 min' },
    { id: 'cardio-6', name: 'Elliptical', description: 'Low impact full body', sets: 1, reps: '20-30 min' },
    { id: 'cardio-7', name: 'Battle Ropes', description: 'Upper body cardio', sets: 3, reps: '30 sec' },
    { id: 'cardio-8', name: 'Burpees', description: 'Full body explosive cardio', sets: 3, reps: 15 },
  ],
};

const CustomWorkout = () => {
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem('customWorkoutPlan');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<string>("select");
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('savedCustomWorkouts');
    return saved ? JSON.parse(saved) : [];
  });
  const [workoutName, setWorkoutName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showResetDialog, setShowResetDialog] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('customWorkoutPlan', JSON.stringify(selectedExercises));
  }, [selectedExercises]);

  useEffect(() => {
    const savedCustomWorkouts = localStorage.getItem('savedCustomWorkouts');
    if (savedCustomWorkouts) {
      setSavedWorkouts(JSON.parse(savedCustomWorkouts));
    }
  }, []);

  const filteredMuscleGroups = useMemo(() => {
    if (!searchTerm) return muscleGroups;

    const filtered: Partial<MuscleGroups> = {};
    for (const [group, exercises] of Object.entries(muscleGroups) as [keyof MuscleGroups, Exercise[]][]) {
      const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredExercises.length > 0) {
        filtered[group] = filteredExercises;
      }
    }
    return filtered as MuscleGroups;
  }, [searchTerm]);

  const handleExerciseToggle = (exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.some(e => e.id === exercise.id);
      return isSelected
        ? prev.filter(e => e.id !== exercise.id)
        : [...prev, exercise];
    });
  };

  const generateCustomPlan = () => {
    if (selectedExercises.length === 0) {
      toast({
        title: "No exercises selected",
        description: "Please select at least one exercise for your workout plan",
        variant: "destructive"
      });
      return;
    }
    
    let name = workoutName.trim() || `Custom Workout ${savedWorkouts.length + 1}`;
    
    let counter = 1;
    const originalName = name;
    while (savedWorkouts.some(workout => workout.name === name)) {
      name = `${originalName} (${counter})`;
      counter++;
    }
    
    const newWorkout = { name, exercises: selectedExercises };
    const updatedWorkouts = [...savedWorkouts, newWorkout];
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem('savedCustomWorkouts', JSON.stringify(updatedWorkouts));
    
    setWorkoutName("");
    setActiveTab("saved");
    
    toast({
      title: "Workout plan created!",
      description: `Created '${name}' with ${selectedExercises.length} exercises`,
    });
  };
  
  const clearSelection = () => {
    setSelectedExercises([]);
    localStorage.removeItem('customWorkoutPlan');
    toast({
      title: "Selection cleared",
      description: "All selected exercises have been cleared",
    });
  };

  const resetWorkouts = () => {
    setSavedWorkouts([]);
    localStorage.removeItem('savedCustomWorkouts');
    setShowResetDialog(false);
    toast({
      title: "Workouts reset",
      description: "All saved workouts have been cleared",
    });
  };

  return (
    <CardContent className="p-0 bg-black">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-black border border-gray-800">
          <TabsTrigger value="select" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Select Exercises
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Saved Workouts
            {savedWorkouts.length > 0 && (
              <span className="ml-2 bg-gray-800 text-white text-xs rounded-full px-2 py-0.5">
                {savedWorkouts.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="select" className="mt-0">
          <div className="px-4 pb-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded bg-black border border-gray-800 text-white focus:border-gray-600 focus:ring-0"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Selected: <span className="text-white font-medium">{selectedExercises.length} exercises</span>
              </div>
              {selectedExercises.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelection}
                  className="text-xs h-8 bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:text-white"
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </div>
          
          <ScrollArea className="h-[320px] pr-4">
            <div className="p-4 space-y-6">
              {Object.entries(filteredMuscleGroups).map(([muscle, exercises]) => (
                <div key={muscle} className="rounded-lg bg-black border border-gray-800 p-4">
                  <h3 className="text-lg font-semibold mb-3 capitalize flex items-center text-white">
                    <Dumbbell className="h-4 w-4 mr-2 text-white" />
                    {muscle}
                  </h3>
                  <div className="space-y-3">
                    {exercises.map((exercise) => (
                      <div 
                        key={exercise.id} 
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                          selectedExercises.some(e => e.id === exercise.id) 
                            ? 'bg-gray-900 border border-gray-700' 
                            : 'hover:bg-gray-900 border border-transparent hover:border-gray-700'
                        }`}
                      >
                        <Checkbox
                          id={exercise.id}
                          checked={selectedExercises.some(e => e.id === exercise.id)}
                          onCheckedChange={() => handleExerciseToggle(exercise)}
                          className="mt-0.5 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <div className="flex-1">
                          <label htmlFor={exercise.id} className="font-medium cursor-pointer flex items-center text-white">
                            {exercise.name}
                            {selectedExercises.some(e => e.id === exercise.id) && (
                              <CheckCircle className="h-4 w-4 ml-2 text-white" />
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
              {Object.keys(filteredMuscleGroups).length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No exercises found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 pt-3 mt-2 border-t border-gray-800">
            <div className="mb-3">
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Name your workout (optional)"
                className="w-full p-2 rounded bg-black border border-gray-800 text-white mb-3 focus:border-gray-600 focus:ring-0"
              />
            </div>
            <Button 
              onClick={generateCustomPlan}
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
              disabled={selectedExercises.length === 0}
            >
              Save Workout Plan
              <Bookmark className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {savedWorkouts.length > 0 ? (
                <>
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowResetDialog(true)}
                    className="w-full mb-4 bg-red-600 hover:bg-red-700"
                  >
                    Reset Workouts
                  </Button>
                  {savedWorkouts.map((workout, index) => (
                    <div key={index} className="bg-black rounded-lg overflow-hidden border border-gray-800">
                      <div className="bg-gray-900 p-3 font-medium flex items-center justify-between">
                        <h3 className="flex items-center text-white">
                          <Bookmark className="h-4 w-4 mr-2 text-white" />
                          {workout.name}
                        </h3>
                        <span className="text-xs bg-gray-800 text-white rounded-full px-2 py-0.5">
                          {workout.exercises.length} exercises
                        </span>
                      </div>
                      <div className="p-3">
                        {workout.exercises.map((exercise, exIndex) => (
                          <div key={exIndex} className="py-2 flex items-start border-b border-gray-800 last:border-b-0">
                            <ArrowRight className="h-4 w-4 mr-2 text-white mt-1 shrink-0" />
                            <div>
                              <div className="font-medium text-white">{exercise.name}</div>
                              <div className="text-sm text-gray-400">
                                {exercise.sets} sets × {exercise.reps} reps
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <Bookmark className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No saved workouts yet.</p>
                  <p className="text-sm mt-1">Select exercises in the 'Select Exercises' tab to create a custom workout.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="bg-black border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete all your saved workouts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={resetWorkouts}
            >
              Reset Workouts
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  );
};

export default CustomWorkout;