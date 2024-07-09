import { Text, View } from "react-native";
import { TripData } from "./[id]";

type Props = {
  tripDetails: TripData
}

export function Activities({ tripDetails }: Props) {
  return (
    <View className="flex-1">
      <Text className="text-white">{JSON.stringify(tripDetails, null, 2)}</Text>
    </View>
  )
}