import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/Stars';

export default function ChangePasswordScreen() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { height } = Dimensions.get('window');
	const ACCENT = '#D4A03B';
	const INPUT_BG = 'rgba(212, 160, 59, 0.08)';
	const INPUT_BORDER = 'rgba(212, 160, 59, 0.25)';

	const navigateBack = () => {
		if (router.canGoBack()) {
			router.back();
		}
	};

	const handleChangePassword = async () => {
		if (!currentPassword.trim()) {
			Alert.alert('Error', 'Please enter your current password');
			return;
		}

		if (!newPassword.trim()) {
			Alert.alert('Error', 'Please enter a new password');
			return;
		}

		if (newPassword.length < 6) {
			Alert.alert('Error', 'New password must be at least 6 characters long');
			return;
		}

		if (newPassword !== confirmPassword) {
			Alert.alert('Error', 'New passwords do not match');
			return;
		}

		if (currentPassword === newPassword) {
			Alert.alert('Error', 'New password must be different from current password');
			return;
		}

		setIsLoading(true);

		try {
			// TODO: Implement password change with Supabase
			await new Promise((resolve) => setTimeout(resolve, 1500));
			Alert.alert('Success', 'Password changed successfully!', [
				{ text: 'OK', onPress: navigateBack },
			]);
		} catch (error) {
			console.error('Password change error:', error);
			Alert.alert('Error', 'Failed to change password. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

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

			<View className="px-6 pt-1" style={{ height: height * 0.25 }}>
				<TouchableOpacity
					className="w-10 h-10 rounded-full flex-row justify-center items-center"
					style={{ marginTop: 40 }}
					onPress={navigateBack}
				>
					<Ionicons name="chevron-back" size={24} color="#fff" />
					<Text className="text-white text-sm">Back</Text>
				</TouchableOpacity>

				<View className="items-center mt-4">
					<Text className="text-3xl font-bold text-white mb-2">Change Password</Text>
					<Text className="text-white/80 text-base text-center px-4">Keep your ELIDZ-STP account secure</Text>
				</View>
			</View>

			<ScreenKeyboardAwareScrollView contentContainerClassName="flex-grow" style={{ zIndex: 2 }}>
				<View
					className="flex-1 bg-white w-full px-6 pb-10 pt-12"
					style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -70 }}
				>
					<View className="flex-row items-center rounded-full mb-4 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="lock-closed-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-[#333]"
							value={currentPassword}
							onChangeText={setCurrentPassword}
							placeholder="Current Password"
							placeholderTextColor={ACCENT}
							secureTextEntry={!showCurrentPassword}
							autoCapitalize="none"
							autoComplete="password"
						/>
						<Pressable className="p-1" onPress={() => setShowCurrentPassword((prev) => !prev)}>
							<Ionicons name={showCurrentPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={ACCENT} />
						</Pressable>
					</View>

					<View className="flex-row items-center rounded-full mb-4 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="lock-closed-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-[#333]"
							value={newPassword}
							onChangeText={setNewPassword}
							placeholder="New Password"
							placeholderTextColor={ACCENT}
							secureTextEntry={!showNewPassword}
							autoCapitalize="none"
							autoComplete="password-new"
						/>
						<Pressable className="p-1" onPress={() => setShowNewPassword((prev) => !prev)}>
							<Ionicons name={showNewPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={ACCENT} />
						</Pressable>
					</View>

                    <View className="flex-row items-center rounded-full mb-6 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="lock-closed-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-[#333]"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							placeholder="Confirm New Password"
							placeholderTextColor={ACCENT}
							secureTextEntry={!showConfirmPassword}
							autoCapitalize="none"
							autoComplete="password-new"
						/>
						<Pressable className="p-1" onPress={() => setShowConfirmPassword((prev) => !prev)}>
							<Ionicons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={ACCENT} />
						</Pressable>
					</View>

					<Button
						className="h-14 rounded-full bg-[#D4A03B] justify-center items-center mb-4 active:opacity-80 active:scale-95"
						onPress={handleChangePassword}
						disabled={isLoading}
					>
						<Text className="text-lg font-semibold text-white">
							{isLoading ? 'Changing...' : 'Change Password'}
						</Text>
					</Button>

					<Button
						variant="outline"
						className="h-14 rounded-full border-[#D4A03B]/40 bg-transparent justify-center items-center"
						onPress={navigateBack}
						disabled={isLoading}
					>
						<Text className="text-lg font-semibold text-[#D4A03B]">Cancel</Text>
					</Button>
				</View>
			</ScreenKeyboardAwareScrollView>
		</View>
	);
}
