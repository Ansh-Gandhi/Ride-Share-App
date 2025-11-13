import { cssInterop } from "nativewind";
import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

cssInterop(MapView, {
  className: "style",
});

const Map = () => {
    // const region = {};

    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            className="h-full w-full rounded-2xl"
            tintColor="black"
            mapType="mutedStandard"
            showsPointsOfInterest={false}
            // initialRegion={region}
            showsUserLocation={true}
            userInterfaceStyle="light"
        />
    );
};

export default Map;