
import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/Stars';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const { login } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert('Invalid Email', 'Please enter a valid email address (e.g., yourname@example.com)');
            return;
        }
        setIsLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Failed to login. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-white">
            <LinearGradient
                colors={['#0a1628', '#122a4d', '#1a3a5c']}
                className="absolute inset-0 w-full"
                style={{ height: height * 0.35 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />
            <Stars />
            {/* Header Section */}
            <View className="px-6 pt-1 w-full" style={{ height: height * 0.25 }}>
                {/* Back Button - Optional, if needed */}
                <TouchableOpacity
                    className="w-10 h-10 rounded-full flex-row justify-center items-center"
                    style={{ marginTop: 40 }}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                    <Text className="text-white text-sm">Back</Text>
                </TouchableOpacity>

                {/* Title */}
                <View className="items-center mt-4">
                    <Text className="text-3xl font-bold text-white mb-2">Sign In</Text>
                    <Text className="text-white/80 text-base">Welcome to ELIDZ-STP</Text>
                </View>
            </View>

            <View className="flex-1 z-10 w-full">
                <ScreenKeyboardAwareScrollView contentContainerClassName="flex-grow">
                    {/* White Card Form */}
                    <View className="flex-1 bg-white w-full px-6 pb-10 pt-12 rounded-t-[50px] -mt-16">
                    {/* Email Input */}
                    <View className="flex-row items-center bg-[#D4A03B]/10 rounded-full mb-4 px-4 h-14 border border-[#D4A03B]/20">
                        <Ionicons name="mail-outline" size={20} color="#D4A03B" style={{ marginRight: 12 }} />
                        <TextInput
                            className="flex-1 text-base text-[#333]"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            placeholderTextColor="#D4A03B"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    {/* Password Input */}
                    <View className="flex-row items-center bg-[#D4A03B]/10 rounded-full mb-2 px-4 h-14 border border-[#D4A03B]/20">
                        <Ionicons name="lock-closed-outline" size={20} color="#D4A03B" style={{ marginRight: 12 }} />
                        <TextInput
                            className="flex-1 text-base text-[#333]"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor="#D4A03B"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="password"
                        />
                        <Pressable
                            className="p-1"
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#D4A03B"
                            />
                        </Pressable>
                    </View>

                    {/* Forgot Password */}
                    <View className="flex-row justify-end mb-6">
                        <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
                            <Text className="text-[#D4A03B] text-sm">
                                Forgot Password?
                            </Text>
                        </Pressable>
                    </View>

                    {/* Sign In Button */}
                    <Button
                        className="h-14 rounded-full bg-[#D4A03B] justify-center items-center mb-8 shadow-lg"
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text className="text-lg font-semibold text-white">
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Text>
                    </Button>

                    {/* Divider */}
                    <View className="flex-row items-center my-6">
                        <View className="flex-1 h-px bg-[#D4A03B]/20" />
                        <Text className="text-[#8a8a8a] mx-4 text-sm font-medium">
                            Or continue with
                        </Text>
                        <View className="flex-1 h-px bg-[#D4A03B]/20" />
                    </View>

                    {/* Sign Up Link */}
                    <View className="flex-row justify-center items-center">
                        <Text className="text-sm text-[#8a8a8a]">Don't have an account? </Text>
                        <Pressable onPress={() => router.push('/(auth)/signup')}>
                            <Text className="text-sm font-semibold text-[#D4A03B] underline">Sign Up</Text>
                        </Pressable>
                    </View>
                    </View>
                </ScreenKeyboardAwareScrollView>
            </View>
        </View>
    );
}
