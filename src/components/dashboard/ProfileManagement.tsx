import React, { useState, useEffect, useRef } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Check,
  Mail,
  Phone,
  Ruler,
  Weight,
  Calendar as CalendarIcon,
  Pencil,
  Upload,
  Camera,
  Flame,
  Trophy,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";

type UserProfile = {
  name: string;
  email: string;
  mobile: string;
  age: string;
  height: string;
  weight: string;
  image: string;
};

type Note = {
  date: string;
  note: string;
};

const ProfileManagement = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "John Doe",
          email: "john@example.com",
          mobile: "+1234567890",
          age: "25",
          height: "175",
          weight: "70",
          image: "",
        };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [streak, setStreak] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("userNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("userProfile", JSON.stringify(tempProfile));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTempProfile({
          ...tempProfile,
          image: result,
        });

        if (!isEditing) {
          const updatedProfile = {
            ...profile,
            image: result,
          };
          setProfile(updatedProfile);
          localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
          toast({
            title: "Profile picture updated",
            description: "Your profile picture has been saved",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toDateString();
    setSelectedDate(dateString);
    const existingNote = notes.find((note) => note.date === dateString);
    if (existingNote) {
      setNoteText(existingNote.note);
    } else {
      setNoteText("");
    }
  };

  const handleNoteSave = () => {
    if (selectedDate) {
      const existingNoteIndex = notes.findIndex(
        (note) => note.date === selectedDate
      );
      if (existingNoteIndex !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[existingNoteIndex] = {
          date: selectedDate,
          note: noteText,
        };
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, { date: selectedDate, note: noteText }]);
      }
      setSelectedDate(null);
      setNoteText("");
    }
  };

  const handleNoteCancel = () => {
    setSelectedDate(null);
    setNoteText("");
  };

  const handleNoteDelete = (date: string) => {
    const updatedNotes = notes.filter((note) => note.date !== date);
    setNotes(updatedNotes);
  };

  const handleNoteEdit = (date: string, note: string) => {
    setSelectedDate(date);
    setNoteText(note);
  };

  return (
    <CardContent className="p-6 ">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center space-y-4 p-4 bg-black rounded-lg border border-gray-800">
          <div className="relative">
            <Avatar
              className="h-36 w-36 ring-2 ring-gray-300 ring-offset-2 ring-offset-black cursor-pointer"
              onClick={handleImageClick}
            >
              <AvatarImage
                src={profile.image || undefined}
                alt={profile.name}
              />
              <AvatarFallback className="bg-gray-300 text-black text-3xl">
                {profile.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div
              className="absolute bottom-1 right-1 bg-white rounded-full p-2 cursor-pointer shadow-lg"
              onClick={handleImageClick}
            >
              <Camera className="h-5 w-5 text-black" />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{profile.email}</p>
          </div>
        </div>

        <div className="flex-1 space-y-8 p-4 bg-black rounded-lg border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <Ruler className="h-6 w-6 text-black" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Height</Label>
                <p className="font-semibold text-lg mt-1 text-white">
                  {profile.height} cm
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <Weight className="h-6 w-6 text-black" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Weight</Label>
                <p className="font-semibold text-lg mt-1 text-white">
                  {profile.weight} kg
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Age</Label>
                <p className="font-semibold text-lg mt-1 text-white">
                  {profile.age} years
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <Phone className="h-6 w-6 text-black" />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Mobile</Label>
                <p className="font-semibold text-lg mt-1 text-white">
                  {profile.mobile}
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-white hover:bg-gray-200 gap-2 py-6 mt-6 text-base text-black"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-5 w-5 text-black" /> Edit Profile
          </Button>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-black border border-gray-800 text-white p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar
                className="h-28 w-28 ring-2 ring-gray-300 ring-offset-2 ring-offset-black cursor-pointer"
                onClick={handleImageClick}
              >
                <AvatarImage
                  src={tempProfile.image || undefined}
                  alt={tempProfile.name}
                />
                <AvatarFallback className="bg-gray-300 text-black text-2xl">
                  {tempProfile.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div
                className="absolute bottom-1 right-1 bg-white rounded-full p-2 cursor-pointer shadow-lg"
                onClick={handleImageClick}
              >
                <Upload className="h-5 w-5 text-black" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-sm text-gray-400">
                Name
              </Label>
              <Input
                id="name"
                value={tempProfile.name}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, name: e.target.value })
                }
                className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 text-white"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email" className="text-sm text-gray-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={tempProfile.email}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, email: e.target.value })
                }
                className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 text-white"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="mobile" className="text-sm text-gray-400">
                Mobile
              </Label>
              <Input
                id="mobile"
                value={tempProfile.mobile}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, mobile: e.target.value })
                }
                className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="age" className="text-sm text-gray-400">
                  Age
                </Label>
                <Input
                  id="age"
                  value={tempProfile.age}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, age: e.target.value })
                  }
                  className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 mt-2 text-white"
                />
              </div>

              <div>
                <Label htmlFor="height" className="text-sm text-gray-400">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  value={tempProfile.height}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, height: e.target.value })
                  }
                  className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 mt-2 text-white"
                />
              </div>

              <div>
                <Label htmlFor="weight" className="text-sm text-gray-400">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  value={tempProfile.weight}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, weight: e.target.value })
                  }
                  className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 mt-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="bg-white border border-gray-300 hover:bg-gray-200 px-5 py-2 text-black"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="bg-white hover:bg-gray-200 px-5 py-2 text-black"
            >
              <Check className="mr-2 h-5 w-5 text-black" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black p-3 rounded-lg border border-gray-800">
          <div className="flex items-center mb-4">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-300" />
            <h4 className="font-medium text-white">Progress Calendar</h4>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={(date) => handleDateSelect(date)}
            className="rounded-md pointer-events-auto bg-black text-white"
          />
        </div>

        <div className="bg-black p-4 rounded-lg border border-gray-800">
          <div className="flex items-center mb-4">
            <h4 className="text-xl font-bold text-white">Notes</h4>
          </div>
          <ul className="space-y-3 max-h-[300px] overflow-y-auto">
            {notes.map((note, index) => (
              <li
                key={index}
                className="flex justify-between items-start bg-gray-900 p-3 rounded-lg border border-gray-800"
              >
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-400">{note.date}</strong>
                  <span className="text-base text-white">{note.note}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleNoteEdit(note.date, note.note)}
                    className="bg-white border border-gray-300 hover:bg-gray-200 px-2 py-1 text-black"
                  >
                    <Pencil className="h-4 w-4 text-black" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleNoteDelete(note.date)}
                    className="bg-white border border-gray-300 hover:bg-gray-200 px-2 py-1 text-black"
                  >
                    <Trash2 className="h-4 w-4 text-black" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => handleNoteCancel()}>
        <DialogContent className="bg-black border border-gray-800 text-white p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">Add/Edit Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="note" className="text-sm text-gray-400">
                Note
              </Label>
              <Input
                id="note"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="bg-gray-900 border-gray-800 focus:border-gray-300 p-3 text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={handleNoteCancel}
              className="bg-white border border-gray-300 hover:bg-gray-200 px-5 py-2 text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNoteSave}
              className="bg-white hover:bg-gray-200 px-5 py-2 text-black"
            >
              <Check className="mr-2 h-5 w-5 text-black" /> Save Note
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CardContent>
  );
};

export default ProfileManagement;