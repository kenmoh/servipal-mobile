import { getDirections } from '@/api/maps';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import Mapbox, { Camera, LocationPuck, MapView, MarkerView } from '@rnmapbox/maps';
import { useContext, useEffect } from 'react';


Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map({ originCoords, destinationCoords }: { originCoords: [number, number], destinationCoords: [number, number] }) {

    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const nigeriaCoordinates = {
        latitude: 9.0820,
        longitude: 8.6753,

    };



    // const originCoords = [
    //     6.4619294,
    //     3.6783286,
    // ];
    // const destinationCoords = [
    //     6.4619294,
    //     3.6783286,
    // ];

    useEffect(() => {
        const [originLat, originLng] = originCoords as [number, number];
        const [destLat, destLng] = destinationCoords as [number, number];
        getDirections([originLat, originLng], [destLat, destLng])
    }, [])


    return (
        <MapView style={{ flex: 1 }} styleURL={theme.mode === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/dark-v11"}>
            <Camera zoomLevel={5} centerCoordinate={[nigeriaCoordinates.longitude, nigeriaCoordinates.latitude]} />

        </MapView>

    );
}