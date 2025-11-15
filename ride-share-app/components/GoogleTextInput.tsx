import { GoogleInputProps } from '@/types/type';
import { View, Image } from 'react-native';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import { icons } from '@/constants';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
    icon, 
    initialLocation, 
    containerStyle, 
    textInputBackgroundColor,
    handlePress
}: GoogleInputProps) => (
    <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}>
        <View 
            className="flex flex-row items-center w-full bg-white rounded-xl" 
            style={{ backgroundColor: textInputBackgroundColor ? textInputBackgroundColor : 'white' }}
        >
            <View className="justify-center items-center w-6 h-6 ml-4">
                <Image 
                    source={icon ? icon : icons.search}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
            </View>
            <GooglePlacesTextInput 
                apiKey={googlePlacesApiKey}
                fetchDetails={true}
                placeHolderText={initialLocation ?? 'Where do you want to go?'}
                debounceDelay={200}
                languageCode="en"
                style={{
                    container: {
                        flex: 1,
                    },
                    input: {
                        backgroundColor: 'transparent',
                        fontSize: 16,
                        fontWeight: '600',
                        borderWidth: 0,
                        paddingLeft: 8, 
                        paddingRight: 8,
                    },
                    suggestionsContainer: {
                        backgroundColor: textInputBackgroundColor ? textInputBackgroundColor : 'white',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        borderRadius: 10,
                        shadowColor: '#d4d4d4',
                        width: '100%',
                        zIndex: 99,
                    },
                }}
                onPlaceSelect={(place) => {
                    const details = place?.details;
                    if (!details || !details.location) {
                        return;
                    }
                    handlePress({
                        latitude: details.location.latitude,
                        longitude: details.location.longitude,
                        address: details.formattedAddress ?? '',
                    });
                }}
                placeholderTextColor="gray" 
            />
        </View>
    </View>
)

export default GoogleTextInput;