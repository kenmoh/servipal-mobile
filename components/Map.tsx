import { getDirections } from '@/api/maps';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/themeContext';
import Mapbox, { Camera, LocationPuck, MapView, ShapeSource } from '@rnmapbox/maps';
import { useContext, useEffect, useState } from 'react';
import { FeatureCollection } from 'geojson';



Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map({ originCoords, destinationCoords, distance }: { originCoords: [number, number], destinationCoords: [number, number], distance: number }) {

    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [route, setRoute] = useState<FeatureCollection | null>(null);
    const [cameraPosition, setCameraPosition] = useState<{ center: [number, number], zoom: number } | null>(null);

    const nigeriaCoordinates = {
        longitude: 8.6753,
        latitude: 9.0820,

    };

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const [originLng, originLat] = originCoords;
                const [destLng, destLat] = destinationCoords;

                const routeCoordinates = await getDirections(
                    [originLng, originLat],
                    [destLng, destLat]

                );

                const routeGeoJSON: FeatureCollection = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: routeCoordinates
                        }
                    }]
                };

                setRoute(routeGeoJSON);
                if (routeCoordinates.length > 0) {
                    const lngs = routeCoordinates.map(coord => coord[0]);
                    const lats = routeCoordinates.map(coord => coord[1]);
                    const minLng = Math.min(...lngs);
                    const maxLng = Math.max(...lngs);
                    const minLat = Math.min(...lats);
                    const maxLat = Math.max(...lats);

                    // Calculate the center of the bounds
                    const center = [
                        (minLng + maxLng) / 2,
                        (minLat + maxLat) / 2,
                    ];

                    let zoom
                    if (distance <= 6) {
                        zoom = 15;
                    } else {
                        zoom = 11.75
                    }

                    if (Array.isArray(center) && center.length === 2) {

                        setCameraPosition({ center: center as [number, number], zoom });
                    }
                }
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        fetchRoute();
    }, [originCoords, destinationCoords]);




    return (
        <MapView style={{ flex: 1 }} styleURL={theme.mode === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/dark-v11"}>
            <Camera zoomLevel={cameraPosition?.zoom} centerCoordinate={cameraPosition?.center} />
            {route && (
                <ShapeSource id="routeSource" shape={route}>
                    <Mapbox.LineLayer
                        id="routeLine"
                        style={{
                            lineColor: 'yellow',
                            lineWidth: 5,
                            lineOpacity: 0.7
                        }}
                    />
                </ShapeSource>


            )}

        </MapView>

    );
}