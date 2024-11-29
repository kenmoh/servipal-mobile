import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context
interface LocationContextType {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  requestLocation: () => Promise<void>;
}

// Create the context with explicit typing
export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Custom hook to use the location context
export const useLocation = () => {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};
