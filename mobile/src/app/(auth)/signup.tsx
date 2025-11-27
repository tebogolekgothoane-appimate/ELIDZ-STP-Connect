import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Stars } from '@/components/Stars';
import { Button } from '@/components/ui/button';

const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
	const { signup } = useAuthContext();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [province, setProvince] = useState('Eastern Cape');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [role, setRole] = useState<'Entrepreneur' | 'Researcher' | 'SMME' | 'Student' | 'Investor' | 'Tenant'>('Entrepreneur');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const [showPostalSuggestions, setShowPostalSuggestions] = useState(false);

	const provinces = [
		'Eastern Cape',
		'Free State',
		'Gauteng',
		'KwaZulu-Natal',
		'Limpopo',
		'Mpumalanga',
		'North West',
		'Northern Cape',
		'Western Cape',
	];

	// Map of major cities/towns for each province
	const citiesByProvince: Record<string, string[]> = {
		'Eastern Cape': ['East London', 'Gqeberha (Port Elizabeth)', 'Mthatha', 'Bhisho', 'Uitenhage', 'Grahamstown', 'Queenstown', 'King William\'s Town', 'Other'],
		'Free State': ['Bloemfontein', 'Welkom', 'Sasolburg', 'Parys', 'Phuthaditjhaba', 'Kroonstad', 'Other'],
		'Gauteng': ['Johannesburg', 'Pretoria', 'Soweto', 'Centurion', 'Sandton', 'Midrand', 'Roodepoort', 'Kempton Park', 'Other'],
		'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Richards Bay', 'Newcastle', 'Port Shepstone', 'Other'],
		'Limpopo': ['Polokwane', 'Thohoyandou', 'Tzaneen', 'Mokopane', 'Bela-Bela', 'Other'],
		'Mpumalanga': ['Mbombela (Nelspruit)', 'Witbank', 'Secunda', 'Middelburg', 'Other'],
		'North West': ['Mahikeng', 'Klerksdorp', 'Rustenburg', 'Potchefstroom', 'Brits', 'Other'],
		'Northern Cape': ['Kimberley', 'Upington', 'Springbok', 'De Aar', 'Other'],
		'Western Cape': ['Cape Town', 'Stellenbosch', 'George', 'Paarl', 'Worcester', 'Mossel Bay', 'Knysna', 'Other'],
	};

	// Map of postal codes for cities
	const postalCodesByCity: Record<string, string[]> = {
		// Eastern Cape
		'East London': ['5201', '5241', '5247', '5200', '5257', '5209', '5213', '5219'],
		'Gqeberha (Port Elizabeth)': ['6001', '6011', '6025', '6045', '6070', '6000', '6006', '6019'],
		'Mthatha': ['5100', '5099', '5101', '5102', '5103', '5104'],
		'Bhisho': ['5605', '5606', '5607', '5608', '5609', '5604'],
		'Uitenhage': ['6229', '6230', '6231', '6232', '6233', '6234'],
		'Grahamstown': ['6139', '6140', '6141', '6142', '6143', '6144'],
		'Queenstown': ['5319', '5320', '5321', '5322', '5323', '5324'],
		'King William\'s Town': ['5600', '5601', '5602', '5603', '5604', '5605'],
		
		// Gauteng
		'Johannesburg': ['2001', '2000', '2094', '2193', '2092', '2091', '2196', '2090'],
		'Pretoria': ['0002', '0001', '0181', '0157', '0081', '0186', '0184', '0182'],
		'Soweto': ['1804', '1809', '1863', '1818', '1852', '1860'],
		'Centurion': ['0157', '0173', '0046', '0149', '0158', '0169'],
		'Sandton': ['2196', '2146', '2031', '2057', '2191', '2128'],
		'Midrand': ['1685', '1682', '1684', '1683', '1686', '1687'],
		'Roodepoort': ['1724', '1709', '1725', '1710', '1730', '1735'],
		'Kempton Park': ['1619', '1620', '1621', '1622', '1623', '1624'],

		// Western Cape
		'Cape Town': ['8000', '8001', '8005', '8060', '7441', '7100', '7700', '7780'],
		'Stellenbosch': ['7600', '7599', '7601', '7602', '7603', '7604'],
		'George': ['6529', '6530', '6531', '6532', '6533', '6534'],
		'Paarl': ['7646', '7620', '7621', '7622', '7623', '7624'],
		'Worcester': ['6850', '6849', '6851', '6852', '6853', '6854'],
		'Mossel Bay': ['6500', '6506', '6501', '6502', '6503', '6504'],
		'Knysna': ['6571', '6570', '6572', '6573', '6574', '6575'],

		// KwaZulu-Natal
		'Durban': ['4001', '4000', '4091', '4052', '4022', '4051', '4062', '4068'],
		'Pietermaritzburg': ['3201', '3200', '3202', '3203', '3204', '3205'],
		'Richards Bay': ['3900', '3901', '3902', '3903', '3904', '3905'],
		'Newcastle': ['2940', '2942', '2943', '2944', '2945', '2946'],
		'Port Shepstone': ['4240', '4241', '4242', '4243', '4244', '4245'],

		// Free State
		'Bloemfontein': ['9301', '9300', '9332', '9323', '9312', '9320', '9317', '9307'],
		'Welkom': ['9459', '9460', '9461', '9462', '9463', '9464'],
		'Sasolburg': ['1947', '1949', '1948', '1950', '1951', '1952'],
		'Parys': ['9585', '9586', '9587', '9588', '9589', '9590'],
		'Phuthaditjhaba': ['9866', '9867', '9868', '9869', '9870', '9871'],
		'Kroonstad': ['9499', '9500', '9501', '9502', '9503', '9504'],

		// Limpopo
		'Polokwane': ['0699', '0700', '0750', '0787', '0704', '0716'],
		'Thohoyandou': ['0950', '0948', '0951', '0952', '0953', '0954'],
		'Tzaneen': ['0850', '0851', '0852', '0853', '0854', '0855'],
		'Mokopane': ['0601', '0600', '0602', '0603', '0604', '0605'],
		'Bela-Bela': ['0480', '0481', '0482', '0483', '0484', '0485'],

		// Mpumalanga
		'Mbombela (Nelspruit)': ['1201', '1200', '1211', '1209', '1210', '1212'],
		'Witbank': ['1035', '1034', '1036', '1037', '1038', '1039'],
		'Secunda': ['2302', '2303', '2304', '2305', '2306', '2307'],
		'Middelburg': ['1055', '1050', '1051', '1052', '1053', '1054'],

		// North West
		'Mahikeng': ['2745', '2735', '2750', '2791', '2736', '2737'],
		'Klerksdorp': ['2571', '2570', '2572', '2573', '2574', '2575'],
		'Rustenburg': ['0299', '0300', '0301', '0302', '0303', '0304'],
		'Potchefstroom': ['2531', '2520', '2532', '2533', '2534', '2535'],
		'Brits': ['0250', '0251', '0252', '0253', '0254', '0255'],

		// Northern Cape
		'Kimberley': ['8301', '8300', '8345', '8309', '8302', '8303'],
		'Upington': ['8801', '8800', '8802', '8803', '8804', '8805'],
		'Springbok': ['8240', '8241', '8242', '8243', '8244', '8245'],
		'De Aar': ['7000', '7001', '7002', '7003', '7004', '7005'],
	};

	async function handleSignup() {
		if (!name || !email || !password || !province || !city || !postalCode) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}

		const fullAddress = `${city}, ${province}, ${postalCode}`;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
		if (!emailRegex.test(email.trim())) {
			Alert.alert('Invalid Email', 'Please enter a valid email address');
			return;
		}

		if (password.length < 8) {
			Alert.alert('Error', 'Password must be at least 8 characters');
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}

		if (!acceptedTerms) {
			Alert.alert('Error', 'Please accept the Terms & Conditions');
			return;
		}

		setIsLoading(true);
		try {
			await signup(name, email, password, role, fullAddress);
			// If we get here, email confirmation is not required or user is already confirmed
			
			// Show verification notice for SMME users
			if (role === 'SMME') {
				Alert.alert(
					'Welcome, SMME Partner!',
					'To access all features and appear in the Verified SMMEs directory, you need to complete business verification. This requires uploading 3 documents: Business Registration, ID Document, and Business Profile.\n\nYou can start the verification process from your profile page.',
					[
						{
							text: 'Go to Profile',
							onPress: () => {
								router.replace('/(tabs)');
								// Navigate to profile after a short delay to ensure tabs are loaded
								setTimeout(() => {
									router.push('/(tabs)/profile');
								}, 500);
							}
						},
						{
							text: 'Later',
							style: 'cancel',
							onPress: () => router.replace('/(tabs)')
						}
					]
				);
			} else {
				router.replace('/(tabs)');
			}
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to sign up. Please try again.';
			
			// Check if this is an email confirmation error
			if (errorMessage.includes('EMAIL_CONFIRMATION_REQUIRED')) {
				Alert.alert(
					'Account Created Successfully',
					'Please check your email to confirm your account. You will be able to log in after confirming your email address.' + (role === 'SMME' ? '\n\nNote: As an SMME, you will need to complete business verification after logging in to access all features.' : ''),
					[
						{ 
							text: 'OK', 
							onPress: () => router.replace('/(auth)') 
						}
					]
				);
			} else {
				Alert.alert('Error', errorMessage);
			}
		} finally {
			setIsLoading(false);
		}
	}

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
			<View className="px-6 pt-1 w-full" style={{ height: height * 0.25 }}>
				{/* Back Button */}
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
					<Text className="text-3xl font-bold text-white mb-2">Create Account</Text>
					<Text className="text-white/80 text-base">Join the ELIDZ-STP community</Text>
				</View>
			</View>

			<View className="flex-1 z-10 w-full">
				<ScreenKeyboardAwareScrollView contentContainerClassName="flex-grow">
					{/* Form Container */}
					<View className="flex-1 bg-white w-full px-6 pb-10 pt-12 rounded-t-[50px] -mt-16">
					{/* Full Name Input */}
					<View className="flex-row items-center rounded-full mb-4 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="person-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-[#333]"
							value={name}
							onChangeText={setName}
							placeholder="Full Name"
							placeholderTextColor={ACCENT}
							autoCapitalize="words"
							autoComplete="name"
						/>
					</View>

					{/* Email Input */}
					<View className="flex-row items-center rounded-full mb-4 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="mail-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-[#333]"
							value={email}
							onChangeText={setEmail}
							placeholder="Email"
							placeholderTextColor={ACCENT}
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
						/>
					</View>

					{/* Province Picker */}
					<View className="flex-row items-center rounded-full mb-4 pl-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="map-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<View className="flex-1 ml-1">
							<Picker
								selectedValue={province}
								onValueChange={(value) => {
									setProvince(value);
									setCity(''); // Reset city when province changes
								}}
								style={{ flex: 1, color: ACCENT }}
								dropdownIconColor={ACCENT}
							>
								{provinces.map((p) => (
									<Picker.Item key={p} label={p} value={p} color={ACCENT} />
								))}
							</Picker>
						</View>
					</View>

					{/* City Picker */}
					<View className="flex-row items-center rounded-full mb-4 pl-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="business-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<View className="flex-1 ml-1">
							<Picker
								selectedValue={city}
								onValueChange={(value) => setCity(value)}
								style={{ flex: 1, color: ACCENT }}
								dropdownIconColor={ACCENT}
							>
								<Picker.Item label="Select City" value="" color="#9CA3AF" />
								{citiesByProvince[province]?.map((c) => (
									<Picker.Item key={c} label={c} value={c} color={ACCENT} />
								))}
							</Picker>
						</View>
					</View>

					{/* Postal Code Input */}
					<View className="relative" style={{ zIndex: 100, elevation: 5 }}>
						<View className="flex-row items-center rounded-full mb-4 px-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
							<Ionicons name="location-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
							<TextInput
								className="flex-1 text-base text-[#333]"
								value={postalCode}
								onChangeText={(text) => {
									setPostalCode(text);
									if (!showPostalSuggestions) setShowPostalSuggestions(true);
								}}
								onFocus={() => setShowPostalSuggestions(true)}
								onBlur={() => {
									// Small delay to allow clicking suggestions
									setTimeout(() => setShowPostalSuggestions(false), 200);
								}}
								placeholder={city ? `Postal Code for ${city}` : "Select City First"}
								placeholderTextColor={ACCENT}
								keyboardType="numeric"
								maxLength={4}
								editable={!!city}
							/>
						</View>
						
						{/* Postal Code Suggestions */}
						{showPostalSuggestions && city && postalCodesByCity[city] && (
								<View 
								className="absolute top-14 left-0 right-0 bg-white border border-[#E5E5E5] rounded-lg shadow-lg max-h-40 overflow-hidden"
								style={{ zIndex: 1000, elevation: 10 }}
							>
								{postalCodesByCity[city]
									.filter(code => code.startsWith(postalCode))
									.slice(0, 5) // Limit suggestions
									.map((code) => (
										<TouchableOpacity
											key={code}
											className="p-3 border-b border-[#F0F0F0] last:border-0 bg-white active:bg-gray-100"
											onPress={() => {
												setPostalCode(code);
												setShowPostalSuggestions(false);
											}}
										>
											<Text className="text-foreground text-base font-medium">{code}</Text>
										</TouchableOpacity>
									))}
								{postalCodesByCity[city].filter(code => code.startsWith(postalCode)).length === 0 && (
									<View className="p-3">
										<Text className="text-muted-foreground text-sm">No matches found</Text>
									</View>
								)}
							</View>
						)}
					</View>

					{/* Password Input */}
					<View className="flex-row items-center bg-input rounded-full mb-4 px-4 h-14 border border-border">
							<Ionicons name="lock-closed-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-foreground"
							value={password}
							onChangeText={setPassword}
							placeholder="Password"
							placeholderTextColor={ACCENT}
							secureTextEntry={!showPassword}
							autoCapitalize="none"
							autoComplete="password-new"
						/>
						<Pressable
							className="p-1"
							onPress={() => setShowPassword(!showPassword)}
						>
							<Ionicons
								name={showPassword ? "eye-outline" : "eye-off-outline"}
								size={20}
								color="#FF6600"
							/>
						</Pressable>
					</View>

					{/* Confirm Password Input */}
					<View className="flex-row items-center bg-input rounded-full mb-4 px-4 h-14 border border-border">
							<Ionicons name="lock-closed-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<TextInput
							className="flex-1 text-base text-foreground"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							placeholder="Confirm Password"
							placeholderTextColor={ACCENT}
							secureTextEntry={!showConfirmPassword}
							autoCapitalize="none"
							autoComplete="password-new"
						/>
						<Pressable
							className="p-1"
							onPress={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							<Ionicons
								name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
								size={20}
								color="#FF6600"
							/>
						</Pressable>
					</View>

					{/* Role Picker */}
							<View className="flex-row items-center rounded-full mb-4 pl-4 h-14 border" style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}>
						<Ionicons name="briefcase-outline" size={20} color={ACCENT} style={{ marginRight: 12 }} />
						<View className="flex-1 ml-1">
							<Picker
								selectedValue={role}
								onValueChange={(value) => setRole(value)}
								style={{ flex: 1, color: ACCENT }}
								dropdownIconColor={ACCENT}
							>
								<Picker.Item label="Entrepreneur" value="Entrepreneur" color={ACCENT} />
								<Picker.Item label="Researcher" value="Researcher" color={ACCENT} />
								<Picker.Item label="SMME" value="SMME" color={ACCENT} />
								<Picker.Item label="Student" value="Student" color={ACCENT} />
								<Picker.Item label="Investor" value="Investor" color={ACCENT} />
								<Picker.Item label="Tenant" value="Tenant" color={ACCENT} />
							</Picker>
						</View>
					</View>

					{/* Terms & Conditions */}
					<View className="flex-row items-start mb-6 pr-2">
						<Pressable
							onPress={() => setAcceptedTerms(!acceptedTerms)}
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<View style={{
								width: 20,
								height: 20,
								borderRadius: 4,
								borderWidth: 2,
								borderColor: ACCENT,
								backgroundColor: acceptedTerms ? ACCENT : 'transparent',
								alignItems: 'center',
								justifyContent: 'center',
								marginRight: 10
							}}>
								{acceptedTerms && <Ionicons name="checkmark" size={16} color="white" />}
							</View>
						</Pressable>
						<Text className="flex-1 text-[13px] text-[#8a8a8a] leading-5">
							By Creating an account, you agree to our{' '}
							<Text className="text-[#D4A03B] font-semibold">Terms & Conditions</Text>
							{' '}and agree to{' '}
							<Text className="text-[#D4A03B] font-semibold">Privacy Policy</Text>
						</Text>
					</View>

					{/* Sign Up Button */}
					<Button
						className="h-14 rounded-full bg-[#D4A03B] justify-center items-center mb-6 active:opacity-80 active:scale-95"
						onPress={handleSignup}
						disabled={isLoading}
					>
						<Text className="text-lg font-semibold text-white">
							{isLoading ? 'Creating Account...' : 'Sign Up'}
						</Text>
					</Button>

					{/* Divider */}
					<View className="flex-row justify-center items-center mt-4">
						<Text className="text-sm text-[#8a8a8a]">Already have an account? </Text>
						<Pressable onPress={() => router.push('/(auth)')}>
							<Text className="text-sm font-semibold text-[#D4A03B] underline">Log In</Text>
						</Pressable>
					</View>
					</View>
				</ScreenKeyboardAwareScrollView>
			</View>
		</View>
	);
}
