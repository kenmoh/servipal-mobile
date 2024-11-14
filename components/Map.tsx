import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
import { useCart } from './CartProvider';
import { useEffect, useState } from 'react';
import { mapboxClient } from '@/api/client';



Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {

    const [originCoords, setOriginCoords] = useState<[number, number] | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(true);
    const { cart } = useCart()

    const nigeriaCoordinates = {
        latitude: 9.0820,
        longitude: 8.6753,

    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const originResponse = await mapboxClient.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(cart.origin)}.json`, {
                    params: {
                        access_token: process.env.EXPO_PUBLIC_MAPBOX_KEY,
                    },
                });
                const destinationResponse = await mapboxClient.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(cart.destination)}.json`, {
                    params: {
                        access_token: process.env.EXPO_PUBLIC_MAPBOX_KEY,
                    },
                });

                // Extract coordinates
                const origin = originResponse?.data.features[0].geometry.coordinates;
                const destination = destinationResponse?.data.features[0].geometry.coordinates;

                setOriginCoords(origin as [number, number]);
                setDestinationCoords(destination as [number, number]);
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [cart.origin, cart.destination]);


    return (
        <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
            <Camera zoomLevel={5} centerCoordinate={[nigeriaCoordinates.longitude, nigeriaCoordinates.latitude]} />
        </MapView>

    );
}