import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useWindowDimensions } from 'react-native';
import ApplicantsScreen from './applicants';
import DetailsScreen from './details';

const TopTabs = createMaterialTopTabNavigator();

export default function JobTabs() {
  const width = useWindowDimensions().width;

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: '600', fontSize: 14, textTransform: 'none' },
        tabBarIndicatorStyle: { backgroundColor: '#2ecc71', height: 2, borderRadius: 99 },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: { backgroundColor: '#fff', elevation: 0, marginTop: 32 },
        tabBarItemStyle: { width: width / 2 },
      }}
    >
      <TopTabs.Screen name="Applicants" component={ApplicantsScreen} />
      <TopTabs.Screen name="Job Details" component={DetailsScreen} />
    </TopTabs.Navigator>
  );
}
