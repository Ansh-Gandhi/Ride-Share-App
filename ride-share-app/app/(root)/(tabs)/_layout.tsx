import { Tabs } from 'expo-router';
import { View, Image, ImageSourcePropType } from 'react-native';
import { icons } from '@/constants'

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => (
  <View
    className={`w-14 h-14 items-center justify-center rounded-full ${
      focused ? "bg-general-400" : "bg-transparent"
    }`}
  >
    <Image
      source={source}
      tintColor="white"
      resizeMode="contain"
      className="w-7 h-7"
    />
  </View>
)


const Layout = () => (
    <Tabs 
        initialRouteName="home"
        screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#333333",
                borderRadius: 50,
                paddingBottom: 30, 
                overflow: "hidden",
                marginHorizontal: 20,
                marginBottom: 20,
                height: 78,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                position: "absolute",
            },
        }}
    >
        <Tabs.Screen 
            name="home"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home}/>
            }}
        />

        <Tabs.Screen 
            name="rides"
            options={{
                title: 'Rides',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list}/>
            }}
        />

        <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile}/>
            }}
        />
    </Tabs>
)

export default Layout;