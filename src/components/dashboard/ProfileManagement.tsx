
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Mail, Phone, Ruler, Weight, Calendar, Pencil } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type UserProfile = {
  name: string;
  email: string;
  mobile: string;
  age: string;
  height: string;
  weight: string;
  image: string;
};

const ProfileManagement = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '+1234567890',
      age: '25',
      height: '175',
      weight: '70',
      image: '',
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem('userProfile', JSON.stringify(tempProfile));
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };

  return (
    <CardContent>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 ring-2 ring-gym-accent ring-offset-2 ring-offset-black">
            <AvatarImage src={profile.image || undefined} alt={profile.name} />
            <AvatarFallback className="bg-gym-accent text-white text-2xl">
              {profile.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="mt-3 text-center">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-gray-400 text-sm">{profile.email}</p>
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 flex items-center space-x-3">
              <div className="bg-gym-accent/20 p-2 rounded-full">
                <Ruler className="h-5 w-5 text-gym-accent" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Height</Label>
                <p className="font-semibold">{profile.height} cm</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 flex items-center space-x-3">
              <div className="bg-gym-accent/20 p-2 rounded-full">
                <Weight className="h-5 w-5 text-gym-accent" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Weight</Label>
                <p className="font-semibold">{profile.weight} kg</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 flex items-center space-x-3">
              <div className="bg-gym-accent/20 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-gym-accent" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Age</Label>
                <p className="font-semibold">{profile.age} years</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 flex items-center space-x-3">
              <div className="bg-gym-accent/20 p-2 rounded-full">
                <Phone className="h-5 w-5 text-gym-accent" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Mobile</Label>
                <p className="font-semibold">{profile.mobile}</p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gym-accent hover:bg-gym-accent/90 gap-2" 
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-[#1e1e1e] border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                className="bg-black/50 border-gray-800 focus:border-gym-accent"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                className="bg-black/50 border-gray-800 focus:border-gym-accent"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                value={tempProfile.mobile}
                onChange={(e) => setTempProfile({ ...tempProfile, mobile: e.target.value })}
                className="bg-black/50 border-gray-800 focus:border-gym-accent"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={tempProfile.age}
                  onChange={(e) => setTempProfile({ ...tempProfile, age: e.target.value })}
                  className="bg-black/50 border-gray-800 focus:border-gym-accent"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={tempProfile.height}
                  onChange={(e) => setTempProfile({ ...tempProfile, height: e.target.value })}
                  className="bg-black/50 border-gray-800 focus:border-gym-accent"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={tempProfile.weight}
                  onChange={(e) => setTempProfile({ ...tempProfile, weight: e.target.value })}
                  className="bg-black/50 border-gray-800 focus:border-gym-accent"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="bg-transparent border border-gray-700 hover:bg-black/30"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-gym-accent hover:bg-gym-accent/90"
            >
              <Check className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CardContent>
  );
};

export default ProfileManagement;
