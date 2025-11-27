import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { Ionicons } from '@expo/vector-icons';
import { Stars } from '@/components/Stars';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleResetPassword = async () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
        if (!emailRegex.test(trimmedEmail)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
                redirectTo: 'elidzstp://(auth)/reset-password',
            });

            if (error) {
                throw error;
            }

            setIsEmailSent(true);
        } catch (error: any) {
            console.error('Password reset error:', error);
            Alert.alert('Error', error.message || 'Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        if (router.canDismiss()) {
            router.dismiss();
        } else {
            router.replace('/(auth)');
        }
    };

	const ACCENT = '#D4A03B';
	const INPUT_BG = 'rgba(212, 160, 59, 0.08)';
	const INPUT_BORDER = 'rgba(212, 160, 59, 0.25)';

	return (
		<View className="flex-1 bg-white">
        <LinearGradient
            colors={['#0a1628', '#122a4d', '#1a3a5c']}
            className="absolute inset-0"
            style={{ height: height * 0.35 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        />
		<Stars />
		{/* Header Section */}
		<View className="px-6 pt-1" style={{ height: height * 0.25 }}>
                {/* Back Button */}
                <TouchableOpacity
                    className="w-10 h-10 rounded-full flex-row justify-center items-center"
                    style={{ marginTop: 40 }}
                    onPress={handleBackToLogin}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                    <Text className="text-white text-sm">Back</Text>
                </TouchableOpacity>

                {/* Title */}
                <View className="items-center mt-4">
                    <Text className="text-3xl font-bold text-white mb-2">Forgot Password</Text>
                    <Text className="text-center text-white/80 px-4 mb-4">
                        Enter your email address and we'll send you a link to reset your password
                    </Text>
                    <Image
                        source={require('../../../assets/logos/blue text-idz logo.png')}
                        style={{ width: 300, height: 130 }}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <ScreenKeyboardAwareScrollView
                contentContainerClassName="flex-grow"
                style={{ zIndex: 2 }}
                showsVerticalScrollIndicator={false}
            >
				{/* Form Card */}
				<View
					className="flex-1 bg-white w-full px-6 pb-10 pt-12"
					style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -70 }}
				>
                    {!isEmailSent ? (
                        <>
                            {/* Email Input */}
			<View className="flex-row items-center rounded-full mb-6 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
								<Ionicons name="mail-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
                                <TextInput
									className="flex-1 text-base text-[#333]"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Your email address"
									placeholderTextColor={ACCENT}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    editable={!isLoading}
                                />
                            </View>

                            {/* Reset Button */}
							<Button
								className="h-14 rounded-full bg-[#D4A03B] justify-center items-center mb-6 active:opacity-80 active:scale-95 shadow-sm"
                                onPress={handleResetPassword}
                                disabled={isLoading}
                            >
                                <Text className="text-lg font-bold text-white">
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                </Text>
                            </Button>

                            {/* Back to Login Link */}
							<View className="flex-row justify-center mt-2">
								<Text className="text-[#8a8a8a]">Remember your password? </Text>
                                <Pressable onPress={handleBackToLogin}>
									<Text className="text-[#D4A03B] font-bold">Log In</Text>
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <View className="items-center pt-4">
                            {/* Success State */}
							<View className="items-center mb-6" style={{ backgroundColor: INPUT_BG, padding: 24, borderRadius: 999 }}>
								<Ionicons name="mail-open-outline" size={60} color={ACCENT} />
                            </View>

                            <Text className="text-2xl font-bold text-center text-foreground mb-3">Check Your Email</Text>
							<Text className="text-center text-[#8a8a8a] mb-8 px-4 leading-6">
                                We've sent a password reset link to{'\n'}
                                <Text className="font-bold text-foreground">{email}</Text>
                            </Text>

                            {/* Back to Login Button */}
                            <Pressable
								className="w-full h-14 rounded-full bg-[#D4A03B] justify-center items-center mb-4 active:opacity-80 active:scale-95 shadow-sm"
                                onPress={handleBackToLogin}
                            >
                                <Text className="text-lg font-bold text-white">Back to Login</Text>
                            </Pressable>

                            {/* Try Different Email */}
                            <Pressable
								className="w-full h-14 rounded-full border-2 border-[#D4A03B] justify-center items-center active:opacity-80 active:scale-95"
                                onPress={() => setIsEmailSent(false)}
                            >
								<Text className="text-lg font-bold text-[#D4A03B]">Try Different Email</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </ScreenKeyboardAwareScrollView>
        </View>
    );
}
