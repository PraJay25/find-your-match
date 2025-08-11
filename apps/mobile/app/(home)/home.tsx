import { useQuery } from "@tanstack/react-query";
import { http } from "@find/api-client";
import { Text, View } from "react-native";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await http.get("/users/me")).data as { user: any }
  });
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-semibold">Home</Text>
      <Text>User: {data ? JSON.stringify(data.user) : ""}</Text>
    </View>
  );
}

