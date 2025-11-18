import { cssInterop } from "nativewind";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useDriverStore, useLocationStore } from '@/store';
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '@/lib/map';
import { MarkerData, Driver } from "@/types/type";
import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { ActivityIndicator, View, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

cssInterop(MapView, {
  className: "style",
});

const Map = () => {
    const { data: drivers, loading, error } = useFetch<Driver[]>('/(api)/driver');

    const {
        userLongitude,
        userLatitude,
        destinationLongitude,
        destinationLatitude,
    } = useLocationStore();
    const { selectedDriver, setDrivers } = useDriverStore();

    const [markers, setMarkers] = useState<MarkerData[]>([])

    const region = calculateRegion({
        userLongitude,
        userLatitude,
        destinationLongitude,
        destinationLatitude,
    });

    useEffect(() => {
        if(Array.isArray(drivers)) {
            if(!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude,
            });

            setMarkers(newMarkers);
        }
    }, [drivers, userLatitude, userLongitude]);

    useEffect(() => {
        if(markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateDriverTimes({
                markers,
                userLongitude,
                userLatitude,
                destinationLongitude,
                destinationLatitude,
            }).then((drivers) => {
                setDrivers(drivers as MarkerData[]);
            });
        }
    }, [markers, destinationLatitude, destinationLongitude]);

    if(loading || (!userLatitude || !userLatitude)) {
        return (
            <View className="flex justify-between items-center w-full">
                <ActivityIndicator 
                    size="small" 
                    color="#000" 
                />
            </View>
        );   
    }

    if(error) {
        return (
            <View className="flex justify-between items-center w-full">
                <Text>ErrorL: {error}</Text>
            </View>
        );  
    }

    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            className="h-full w-full rounded-2xl"
            tintColor="black"
            mapType="mutedStandard"
            showsPointsOfInterest={false}
            region={region}
            showsUserLocation={true}
            userInterfaceStyle="light"
        >
            {markers.map((marker) => (
                <Marker 
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                    title={marker.title}
                    image={selectedDriver === marker.id ? icons.selectedMarker : icons.marker}
                />
            ))}

            {destinationLatitude && destinationLongitude && (
                <>
                    <Marker 
                        key="destination"
                        coordinate={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude,
                        }}
                        title="destination"
                        image={icons.pin}
                    />

                    <MapViewDirections 
                        origin={{
                            latitude: userLatitude!,
                            longitude: userLongitude!,
                        }}
                        destination={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude,
                        }}
                        apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                        strokeColor="#0286ff"
                        strokeWidth={3}
                    />
                </>
            )}
        </MapView>
    );
};

export default Map;