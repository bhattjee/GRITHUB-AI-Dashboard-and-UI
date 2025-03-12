import React, { useState, useEffect } from 'react';
import { CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Calendar as CalendarIcon, CheckCircle2, Flame } from 'lucide-react';

const chestExercises = {
  weightLoss: [
    { name: "Push-ups", sets: 4, reps: "20-25", description: "Bodyweight chest exercise", safety: "Maintain proper form" },
    { name: "Incline Push-ups", sets: 4, reps: "15-20", description: "Upper chest focus", safety: "Keep core tight" },
    { name: "High-Rep Bench Press", sets: 4, reps: "15-20", description: "Light weight, high reps", safety: "Control the movement" },
    { name: "Cable Flyes", sets: 3, reps: "20-25", description: "Continuous tension", safety: "Maintain form throughout" },
    { name: "Medicine Ball Push-ups", sets: 3, reps: "15-20", description: "Dynamic chest exercise", safety: "Balance carefully" }
  ],
  muscleBuild: [
    { name: "Bench Press", sets: 4, reps: "6-8", description: "Heavy compound movement", safety: "Use a spotter" },
    { name: "Incline Dumbbell Press", sets: 4, reps: "8-10", description: "Upper chest development", safety: "Control the weights" },
    { name: "Weighted Dips", sets: 3, reps: "8-12", description: "Compound chest exercise", safety: "Proper depth" },
    { name: "Decline Bench Press", sets: 3, reps: "8-10", description: "Lower chest focus", safety: "Lock the bench" },
    { name: "Chest Flyes", sets: 3, reps: "10-12", description: "Isolation movement", safety: "Don't overstretch" }
  ]
};

const backExercises = {
  weightLoss: [
    { name: "Assisted Pull-ups", sets: 4, reps: "15-20", description: "Full range back exercise", safety: "Complete full range" },
    { name: "High-Rep Rows", sets: 4, reps: "20-25", description: "Light weight rowing", safety: "Squeeze at peak" },
    { name: "Face Pulls", sets: 3, reps: "20-25", description: "Upper back endurance", safety: "Control movement" },
    { name: "Resistance Band Pulls", sets: 3, reps: "20-30", description: "Back activation", safety: "Keep tension" },
    { name: "TRX Rows", sets: 3, reps: "15-20", description: "Bodyweight back exercise", safety: "Body alignment" }
  ],
  muscleBuild: [
    { name: "Weighted Pull-ups", sets: 4, reps: "6-8", description: "Heavy back compound", safety: "Control descent" },
    { name: "Barbell Rows", sets: 4, reps: "8-10", description: "Heavy rowing movement", safety: "Maintain posture" },
    { name: "T-Bar Rows", sets: 3, reps: "8-12", description: "Thick back builder", safety: "Brace core" },
    { name: "Meadows Rows", sets: 3, reps: "8-10", description: "Unilateral back work", safety: "Hip hinge" },
    { name: "Deadlifts", sets: 3, reps: "5-8", description: "Power back exercise", safety: "Proper setup" }
  ]
};

const legExercises = {
  weightLoss: [
    { name: "Bodyweight Squats", sets: 4, reps: "25-30", description: "High volume legs", safety: "Full depth" },
    { name: "Walking Lunges", sets: 4, reps: "20 each", description: "Cardio and legs", safety: "Step control" },
    { name: "Step-ups", sets: 3, reps: "20 each", description: "Single leg work", safety: "Balance focus" },
    { name: "Jump Squats", sets: 3, reps: "15-20", description: "Explosive movement", safety: "Land softly" },
    { name: "High-Rep Leg Press", sets: 3, reps: "20-25", description: "Volume focused", safety: "Don't lock out" }
  ],
  muscleBuild: [
    { name: "Heavy Squats", sets: 5, reps: "5-8", description: "Primary leg builder", safety: "Proper depth" },
    { name: "Romanian Deadlifts", sets: 4, reps: "8-10", description: "Hamstring focus", safety: "Hip hinge" },
    { name: "Hack Squats", sets: 3, reps: "8-12", description: "Quad development", safety: "Control descent" },
    { name: "Bulgarian Split Squats", sets: 3, reps: "8-10", description: "Unilateral strength", safety: "Balance" },
    { name: "Leg Press", sets: 3, reps: "8-12", description: "Heavy compound", safety: "Control weight" }
  ]
};

const shoulderExercises = {
  weightLoss: [
    { name: "Light Military Press", sets: 4, reps: "15-20", description: "High rep pressing", safety: "Control path" },
    { name: "Band Laterals", sets: 4, reps: "20-25", description: "Side delt burn", safety: "Maintain form" },
    { name: "Front Raises", sets: 3, reps: "15-20", description: "Light weight", safety: "No swinging" },
    { name: "Upright Rows", sets: 3, reps: "15-20", description: "High volume", safety: "Elbows lead" },
    { name: "Pike Push-ups", sets: 3, reps: "12-15", description: "Bodyweight press", safety: "Form first" }
  ],
  muscleBuild: [
    { name: "Heavy OHP", sets: 4, reps: "6-8", description: "Strength press", safety: "Brace core" },
    { name: "Seated DB Press", sets: 4, reps: "8-10", description: "Heavy pressing", safety: "Back support" },
    { name: "Heavy Laterals", sets: 3, reps: "10-12", description: "Side delt focus", safety: "Controlled" },
    { name: "Face Pulls", sets: 3, reps: "12-15", description: "Rear delt work", safety: "Pull to face" },
    { name: "Arnold Press", sets: 3, reps: "8-12", description: "Full shoulder", safety: "Rotate smooth" }
  ]
};

const armExercises = {
  weightLoss: [
    { name: "High-Rep Curls", sets: 4, reps: "20-25", description: "Light bicep work", safety: "Full range" },
    { name: "Band Pushdowns", sets: 4, reps: "20-30", description: "Tricep burn", safety: "Keep tension" },
    { name: "Hammer Curls", sets: 3, reps: "15-20", description: "Light weight", safety: "No swing" },
    { name: "Diamond Push-ups", sets: 3, reps: "15-20", description: "Tricep focus", safety: "Keep elbows in" },
    { name: "21s Bicep Curls", sets: 3, reps: "21 reps", description: "Endurance", safety: "Control tempo" }
  ],
  muscleBuild: [
    { name: "Heavy Barbell Curls", sets: 4, reps: "8-10", description: "Mass builder", safety: "Strict form" },
    { name: "Skull Crushers", sets: 4, reps: "8-12", description: "Tricep power", safety: "Elbow position" },
    { name: "Incline DB Curls", sets: 3, reps: "10-12", description: "Peak contraction", safety: "Full stretch" },
    { name: "Close-Grip Bench", sets: 3, reps: "8-10", description: "Tricep strength", safety: "Wrist position" },
    { name: "Preacher Curls", sets: 3, reps: "10-12", description: "Strict bicep", safety: "Use support" }
  ]
};

const coreExercises = {
  weightLoss: [
    { name: "Mountain Climbers", sets: 4, reps: "30 sec", description: "Core cardio", safety: "Hip position" },
    { name: "Russian Twists", sets: 4, reps: "30 each", description: "Rotational move", safety: "Control twist" },
    { name: "Bicycle Crunches", sets: 3, reps: "30 sec", description: "Dynamic core", safety: "Lower back" },
    { name: "Plank Hold", sets: 3, reps: "45-60 sec", description: "Endurance", safety: "Flat back" },
    { name: "Flutter Kicks", sets: 3, reps: "30 sec", description: "Lower abs", safety: "Back flat" }
  ],
  muscleBuild: [
    { name: "Weighted Crunches", sets: 4, reps: "12-15", description: "Heavy abs", safety: "Control weight" },
    { name: "Cable Woodchops", sets: 4, reps: "12 each", description: "Power core", safety: "Hip rotation" },
    { name: "Dragon Flags", sets: 3, reps: "8-12", description: "Full core", safety: "Progress slowly" },
    { name: "Ab Wheel", sets: 3, reps: "10-15", description: "Core strength", safety: "Roll control" },
    { name: "Hanging Leg Raises", sets: 3, reps: "12-15", description: "Lower abs", safety: "No swing" }
  ]
};

const generateWorkoutPlan = (type: 'weight-loss' | 'muscle-gain') => {
  const workoutStyle = type === 'weight-loss' ? 'weightLoss' : 'muscleBuild';
  
  const days = Array.from({ length: 28 }, (_, i) => {
    const dayNumber = i + 1;
    let muscle = '';
    let exerciseList: any[] = [];
    
    if (i % 7 === 0) {
      muscle = 'Chest';
      exerciseList = chestExercises[workoutStyle];
    } else if (i % 7 === 1) {
      muscle = 'Back';
      exerciseList = backExercises[workoutStyle];
    } else if (i % 7 === 2) {
      muscle = 'Legs';
      exerciseList = legExercises[workoutStyle];
    } else if (i % 7 === 3) {
      muscle = 'Shoulders';
      exerciseList = shoulderExercises[workoutStyle];
    } else if (i % 7 === 4) {
      muscle = 'Arms';
      exerciseList = armExercises[workoutStyle];
    } else if (i % 7 === 5) {
      muscle = 'Core';
      exerciseList = coreExercises[workoutStyle];
    } else {
      muscle = 'Rest';
      exerciseList = [];
    }

    return {
      day: dayNumber,
      completed: false,
      muscle: muscle,
      exercises: exerciseList
    };
  });

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
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    return workoutPlan
      .filter(day => day.completed)
      .map((_, i) => new Date(2024, 0, i + 1));
  });

  // Calculate streak when completed days change
  useEffect(() => {
    calculateStreak();
  }, [workoutPlan]);

  const calculateStreak = () => {
    // Sort days by number and find consecutive completed days
    const sortedDays = [...workoutPlan].sort((a, b) => a.day - b.day);
    let currentStreak = 0;
    
    for (let i = 0; i < sortedDays.length; i++) {
      if (sortedDays[i].completed) {
        currentStreak++;
      } else {
        // Break streak if a day is not completed
        break;
      }
    }
    
    setStreak(currentStreak);
    localStorage.setItem('workoutChallengeStreak', currentStreak.toString());
  };

  const handleTypeChange = (checked: boolean) => {
    setShowDialog(true);
  };

  const confirmTypeChange = () => {
    const newType = workoutType === 'weight-loss' ? 'muscle-gain' : 'weight-loss';
    setWorkoutType(newType);
    const newPlan = generateWorkoutPlan(newType);
    setWorkoutPlan(newPlan);
    setStreak(0);
    setSelectedDates([]);
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
      
      // Update selected dates for calendar
      const newDates = newPlan
        .filter(day => day.completed)
        .map((day) => new Date(2024, 0, day.day));
      
      setSelectedDates(newDates);
      
      return newPlan;
    });
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
                <AccordionItem key={index} value={`day-${day.day}`} className="border-b border-gray-800 last:border-0">
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
                selected={selectedDates}
                className="rounded-md pointer-events-auto"
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
