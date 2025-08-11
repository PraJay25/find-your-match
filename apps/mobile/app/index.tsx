import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { http } from "@find/api-client";
import { useAuthStore } from "../src/state/auth.store";
import { useLoginNavigation } from "../src/features/auth/useLoginNavigation";

export default function Index() {
  const setToken = useAuthStore((s) => s.setToken);
  useLoginNavigation();

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const onLogin = async () => {
    try {
      setSubmitting(true);
      const res = await http.post("/auth/login", { email, password });
      const token = res.data.token as string;
      setToken(token);
      Alert.alert("Login successful");
    } catch (e: any) {
      Alert.alert("Login failed", e?.error || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-center px-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-8 items-center">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
              <Text className="text-white text-xl">💘</Text>
            </View>
            <Text className="mt-4 text-white text-2xl font-extrabold">FindYourMatch</Text>
            <Text className="mt-1 text-slate-300">Sign in to continue</Text>
          </View>

          <View className="rounded-2xl bg-white p-6">
            <View className="gap-3">
              <View>
                <Text className="mb-2 text-slate-600">Email</Text>
                <TextInput
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
                  placeholder="you@example.com"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="next"
                />
              </View>

              <View>
                <Text className="mb-2 text-slate-600">Password</Text>
                <View className="w-full flex-row items-center rounded-xl border border-slate-200 bg-white px-4">
                  <TextInput
                    className="flex-1 py-3 text-slate-900"
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={isPasswordHidden}
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType="go"
                    onSubmitEditing={onLogin}
                  />
                  <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() => setPasswordHidden((v) => !v)}
                    className="ml-2 px-2 py-1"
                  >
                    <Text className="text-blue-600 font-semibold">
                      {isPasswordHidden ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="items-end">
                <TouchableOpacity>
                  <Text className="text-blue-600 text-sm font-semibold">Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className={`mt-2 w-full items-center justify-center rounded-xl bg-blue-600 py-3 ${
                  isSubmitting ? "opacity-70" : ""
                }`}
                onPress={onLogin}
                disabled={isSubmitting}
              >
                <Text className="text-base font-semibold text-white">
                  {isSubmitting ? "Signing in…" : "Sign In"}
                </Text>
              </TouchableOpacity>

              <View className="mt-4 flex-row items-center justify-center gap-1">
                <Text className="text-slate-500">New here?</Text>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-semibold">Create an account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-10 items-center">
            <Text className="text-center text-xs text-slate-400">
              By continuing you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

