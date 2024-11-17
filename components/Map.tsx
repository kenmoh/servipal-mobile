import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
import { useContext } from 'react';


Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {

    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const nigeriaCoordinates = {
        latitude: 9.0820,
        longitude: 8.6753,

    };



    return (
        <MapView style={{ flex: 1 }} styleURL={theme.mode === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/dark-v11"}>
            <Camera zoomLevel={5} centerCoordinate={[nigeriaCoordinates.longitude, nigeriaCoordinates.latitude]} />
        </MapView>

    );
}