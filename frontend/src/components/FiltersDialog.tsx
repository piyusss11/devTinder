import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FiltersDialogProps {
  onFilters: (
    gender: string,
    skills: string,
    minAge: null | number,
    maxAge: null | number
  ) => void;
}

export const FiltersDialog: React.FC<FiltersDialogProps> = ({ onFilters }) => {
  const [minAge, setMinAge] = useState<null | number>(18);
  const [maxAge, setMaxAge] = useState<null | number>(60);
  const [gender, setGender] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false); 

  const handleApplyFilters = () => {
    onFilters(gender, skills, minAge, maxAge);
    setIsOpen(false);
    setShowFilters(true); 
  };
 const handleRemoveFilters = () => {
    setGender("");
    setSkills("");
    setMinAge(null);
    setMaxAge(null);
    setIsOpen(false);
    setShowFilters(false); 
    onFilters("", "", null, null); 
  };
  return (
    <div className="px-8 pt-4 flex gap-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gray-500 hover:bg-[#F58F7C] outline-none"
            variant="destructive"
          >
            Filters
          </Button>
        </DialogTrigger>
        <div className="flex gap-4">
          {minAge && maxAge && showFilters && (
            <Button
              className="bg-[#F58F7C] hover:bg-[#F58F7C] outline-none"
              variant={"destructive"}
            >
              {minAge} - {maxAge}
            </Button>
          )}
          {gender && showFilters && (
            <Button
              className="bg-[#F58F7C] hover:bg-[#F58F7C] outline-none"
              variant={"destructive"}
            >
              {gender}
            </Button>
          )}
          {skills &&
            showFilters &&
            skills.split(",").map((skill, index) => (
              <Button
                key={index}
                className="bg-[#F58F7C] hover:bg-[#F58F7C] outline-none"
                variant={"destructive"}
              >
                {skill}
              </Button>
            ))}
        </div>
        <DialogContent className="sm:max-w-[425px] bg-[#2c2b30] text-white">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription>
              Adjust your filter criteria here. Click apply when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 text-black">
              <Label htmlFor="gender" className="text-right text-white">
                Gender
              </Label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                className="col-span-3"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="Enter skills separated by commas"
                className="col-span-3"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ageRange" className="text-center col-span-4">
                Age Range
              </Label>
              <div className="col-span-4">
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[minAge?? 18, maxAge ?? 60]}
                  onValueChange={(value) => {
                    setMinAge(value[0]);
                    setMaxAge(value[1]);
                  }}
                  aria-label="Age Range"
                />
                <div className="flex justify-between mt-2">
                  <span>Min Age: {minAge}</span>
                  <span>Max Age: {maxAge}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-gray-500 hover:bg-[#F58F7C]"
              onClick={handleRemoveFilters}
              type="submit"
            >
              Remove Filters
            </Button>
            <Button
              className="bg-[#F58F7C] hover:bg-gray-500"
              onClick={handleApplyFilters}
              type="submit"
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
