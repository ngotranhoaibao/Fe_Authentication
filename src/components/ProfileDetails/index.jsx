import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
const ProfileField = ({ label, value, loading }) => (
  <div className="flex flex-col sm:flex-row py-3 border-b border-gray-100 last:border-b-0">
    <div className="w-full sm:w-1/3">
      <Label className="text-gray-600 font-medium text-sm sm:text-base">
        {label}
      </Label>
    </div>
    <div className="w-full sm:w-2/3 mt-1 sm:mt-0">
      {loading ? (
        <Skeleton className="h-5 w-[80%] my-0.5" />
      ) : (
        <p className="text-gray-800 font-normal text-sm sm:text-base">
          {value || "N/A"}
        </p>
      )}
    </div>
  </div>
);

const ProfileDetails = ({ profile, loading, error, onLogout }) => {
  if (error) {
    return (
      <div className="text-red-600 text-center p-8 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
        {error}
      </div>
    );
  }
  const displayProfile = {
    name: profile?.name || profile?.fullName,
    email: profile?.email,
    role: profile?.role || "User",
  };
  const isLoading = loading || profile === null;

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-4xl shadow-md border-gray-200">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="space-y-4">
              <ProfileField
                label="Name"
                value={displayProfile.name}
                loading={isLoading}
              />
              <ProfileField
                label="Email"
                value={displayProfile.email}
                loading={isLoading}
              />
              <ProfileField
                label="Role"
                value={displayProfile.role}
                loading={isLoading}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start bg-gray-50 border-t p-6 mt-0">
          <h3 className="text-lg font-semibold text-gray-800 ">
            Profile Details
          </h3>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onLogout}
              disabled={isLoading}
            >
              <span className="text-sm font-medium">Log Out</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileDetails;
