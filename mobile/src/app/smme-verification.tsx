import React, { useState } from 'react';
import { View, Alert, Pressable, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '@/hooks/use-auth-context';
import * as ImagePicker from 'expo-image-picker';
import { verificationService } from '@/services/verification.service';
import { ScreenScrollView } from '@/components/ScreenScrollView';

export default function SMMEVerificationScreen() {
    const { profile } = useAuthContext();
    const [documentUri, setDocumentUri] = useState<string | null>(null);
    const [documentType, setDocumentType] = useState<'CIPC' | 'Tax Clearance' | 'ID' | 'Other' | 'General'>('General');
    const [isUploading, setIsUploading] = useState(false);

    const pickDocument = async () => {
        // We are using ImagePicker as a proxy for document picking since expo-document-picker is not installed
        // In a real app, we should add expo-document-picker for PDFs
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setDocumentUri(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        if (!documentUri) {
            Alert.alert('Error', 'Please select a document to upload.');
            return;
        }

        if (!profile?.id) return;

        setIsUploading(true);
        try {
            // 1. Upload file (mocked for now)
            const publicUrl = await verificationService.uploadDocument(documentUri);
            
            // 2. Create verification record
            await verificationService.submitVerification(profile.id, publicUrl, documentType);
            
            Alert.alert(
                'Success', 
                'Your document has been submitted for verification. We will notify you once approved.',
                [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
            );
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to submit verification.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <ScreenScrollView>
            <View className="p-6">
                <Pressable onPress={() => router.back()} className="mb-6">
                    <Feather name="arrow-left" size={24} color="#002147" />
                </Pressable>

                <View className="items-center mb-8">
                    <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4">
                        <Feather name="shield" size={40} color="#002147" />
                    </View>
                    <Text className="text-2xl font-bold text-[#002147] text-center">
                        Verify Your Business
                    </Text>
                    <Text className="text-gray-500 text-center mt-2">
                        To access exclusive SMME benefits, please upload your business registration documents (e.g., CIPC, Tax Clearance).
                    </Text>
                </View>

                <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <Text className="font-semibold text-[#002147] mb-4">Upload Document</Text>
                    
                    <Pressable 
                        onPress={pickDocument}
                        className={`border-2 border-dashed rounded-xl h-48 items-center justify-center mb-4 ${documentUri ? 'border-[#28A745] bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                    >
                        {documentUri ? (
                            <View className="items-center">
                                <Image source={{ uri: documentUri }} className="w-20 h-20 rounded-lg mb-2" resizeMode="cover" />
                                <Text className="text-[#28A745] font-semibold">Document Selected</Text>
                                <Text className="text-xs text-gray-500 mt-1">Tap to change</Text>
                            </View>
                        ) : (
                            <View className="items-center">
                                <Feather name="upload-cloud" size={40} color="#9CA3AF" className="mb-2" />
                                <Text className="text-gray-500 font-medium">Tap to select image</Text>
                                <Text className="text-xs text-gray-400 mt-1">JPG, PNG supported</Text>
                            </View>
                        )}
                    </Pressable>

                    {/* Document Type Selection - Simple buttons for now */}
                    <Text className="text-xs font-semibold text-gray-500 mb-2 uppercase">Document Type</Text>
                    <View className="flex-row flex-wrap gap-2 mb-6">
                        {['CIPC', 'Tax Clearance', 'ID', 'Other'].map((type) => (
                            <Pressable
                                key={type}
                                onPress={() => setDocumentType(type as any)}
                                className={`px-4 py-2 rounded-full border ${documentType === type ? 'bg-[#002147] border-[#002147]' : 'bg-white border-gray-200'}`}
                            >
                                <Text className={`text-xs font-medium ${documentType === type ? 'text-white' : 'text-gray-600'}`}>
                                    {type}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <Button
                        className="bg-[#002147] h-14 rounded-full"
                        onPress={handleUpload}
                        disabled={isUploading || !documentUri}
                    >
                        <Text className="text-white font-bold text-lg">
                            {isUploading ? 'Submitting...' : 'Submit for Verification'}
                        </Text>
                    </Button>
                </View>

                <View className="flex-row items-start bg-blue-50 p-4 rounded-xl">
                    <Feather name="info" size={20} color="#002147" className="mt-0.5 mr-3" />
                    <Text className="flex-1 text-[#002147] text-sm leading-5">
                        Your documents will be reviewed by our admin team. This process usually takes 24-48 hours.
                    </Text>
                </View>
            </View>
        </ScreenScrollView>
    );
}

