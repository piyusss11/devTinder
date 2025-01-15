import { useState } from "react";

const ChangePasswordPopUp = () => {
  return <DialogDemo />;
};

export default ChangePasswordPopUp;
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
import axios from "axios";
import { Local_Url } from "@/utils/constants";
import { toast } from "@/hooks/use-toast";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DialogDemo() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const handleChangePassword = async () => {
    try{

        await axios.patch(
          `${Local_Url}/profile/editPassword`,
          {
            oldPassword,
            newPassword,
            confirmPassword,
          },
          { withCredentials: true }
        );

        toast({ title: "Password Changed", description: "Password Changed Successfully", });
    }catch(error){
        toast({ title: "Password Change Failed", description: "Invalid credentials",variant: "destructive" });
        console.log(error)
    }
  };
  return (
    <Dialog>
    <DialogTrigger className="text-white" asChild>
      <Button className="bg-gray-500 hover:bg-[#F58F7C]">Change Password</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-[#2c2b30] text-white">
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Make changes to your password here. Click update when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 mr-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="oldPassword" className="text-center">
            Old Password
          </Label>
          <div className="relative col-span-3">
            <Input
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              className="w-full pr-10"
            />
            <span
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              onClick={toggleOldPasswordVisibility}
            >
              <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="newPassword" className="text-center">
            New Password
          </Label>
          <div className="relative col-span-3">
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              className="w-full pr-10"
            />
            <span
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              onClick={toggleNewPasswordVisibility}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="confirmPassword" className="text-center">
            Confirm Password
          </Label>
          <div className="relative col-span-3">
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pr-10"
            />
            <span
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button className="bg-[#F58F7C] hover:bg-[#ffa595]" onClick={handleChangePassword} type="submit">
          Change Password
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
