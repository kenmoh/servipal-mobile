import React, { useEffect, useState } from 'react'
import * as Location from "expo-location";

import { LocationContext } from '@/auth/locationContext';

// Provider component
const LocationProvider = ({
    children,
}: { children: React.ReactNode }) => {
    const [currentLocation, setCurrentLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const requestLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                let location = await Location.getCurrentPositionAsync({});
                setCurrentLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        } catch (error) {
            console.error("Error requesting location:", error);
        }
    };

    useEffect(() => {
        requestLocation();
    }, []);

    return <LocationContext.Provider value={{ currentLocation, requestLocation }}>{children}</LocationContext.Provider>;
};

export default LocationProvider
