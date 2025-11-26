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

interface DocumentSlot {
    type: 'Business Registration' | 'ID Document' | 'Business Profile';
    label: string;
    description: string;
    icon: string;
    uri: string | null;
}

export default function SMMEVerificationScreen() {
    const { profile } = useAuthContext();
    const [documents, setDocuments] = useState<DocumentSlot[]>([
        {
            type: 'Business Registration',
            label: 'Business Registration (CIPC)',
            description: 'Your official company registration certificate',
            icon: 'file-text',
            uri: null
        },
        {
            type: 'ID Document',
            label: 'ID Document',
            description: 'Clear photo of your South African ID',
            icon: 'credit-card',
            uri: null
        },
        {
            type: 'Business Profile',
            label: 'Business Profile',
            description: 'Company profile or business plan document',
            icon: 'briefcase',
            uri: null
        }
    ]);
    const [isUploading, setIsUploading] = useState(false);

    const pickDocument = async (index: number) => {
        // We are using ImagePicker as a proxy for document picking since expo-document-picker is not installed
        // In a real app, we should add expo-document-picker for PDFs
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        });

        if (!result.canceled) {
            const updatedDocuments = [...documents];
            updatedDocuments[index].uri = result.assets[0].uri;
            setDocuments(updatedDocuments);
        }
    };

    const handleUpload = async () => {
        // Check if all 3 required documents are uploaded
        const missingDocs = documents.filter(doc => !doc.uri);
        if (missingDocs.length > 0) {
            Alert.alert(
                'Missing Documents', 
                `Please upload all 3 required documents:\n${missingDocs.map(d => `• ${d.label}`).join('\n')}`
            );
            return;
        }

        if (!profile?.id) return;

        setIsUploading(true);
        try {
            // Upload all documents
            const uploadPromises = documents.map(async (doc) => {
                if (!doc.uri) return null;
                
                // 1. Upload file to Supabase Storage
                const publicUrl = await verificationService.uploadDocument(doc.uri, profile.id, doc.type);
                
                return {
                    url: publicUrl,
                    type: doc.type
                };
            });

            const uploadedDocs = await Promise.all(uploadPromises);
            const validDocs = uploadedDocs.filter(d => d !== null) as { url: string; type: any }[];
            
            // 2. Submit all verification records
            await verificationService.submitMultipleDocuments(profile.id, validDocs);
            
            Alert.alert(
                'Success', 
                'All documents have been submitted for verification. We will review them within 24-48 hours and notify you once approved.',
                [{ text: 'OK', onPress: () => router.replace('/(tabs)/profile') }]
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
                        Upload the 3 required documents to prove your business legitimacy and gain access to exclusive SMME benefits.
                    </Text>
                </View>

                {/* Required Documents Section */}
                <View className="mb-6">
                    <Text className="text-sm font-bold text-[#002147] mb-4 uppercase tracking-wide">
                        Required Documents (3)
                    </Text>
                    
                    {documents.map((doc, index) => (
                        <View key={doc.type} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
                            <View className="flex-row items-center mb-3">
                                <View className="w-10 h-10 bg-[#002147]/5 rounded-full items-center justify-center mr-3">
                                    <Feather name={doc.icon as any} size={20} color="#002147" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-[#002147] text-base">{doc.label}</Text>
                                    <Text className="text-xs text-gray-500 mt-0.5">{doc.description}</Text>
                                </View>
                                {doc.uri && (
                                    <View className="w-6 h-6 bg-[#28A745] rounded-full items-center justify-center">
                                        <Feather name="check" size={14} color="white" />
                                    </View>
                                )}
                            </View>
                            
                            <Pressable 
                                onPress={() => pickDocument(index)}
                                className={`border-2 border-dashed rounded-xl h-32 items-center justify-center ${doc.uri ? 'border-[#28A745] bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                            >
                                {doc.uri ? (
                                    <View className="items-center">
                                        <Image source={{ uri: doc.uri }} className="w-16 h-16 rounded-lg mb-2" resizeMode="cover" />
                                        <Text className="text-[#28A745] font-semibold text-sm">Document Uploaded</Text>
                                        <Text className="text-xs text-gray-500 mt-1">Tap to change</Text>
                                    </View>
                                ) : (
                                    <View className="items-center">
                                        <Feather name="upload-cloud" size={32} color="#9CA3AF" />
                                        <Text className="text-gray-500 font-medium text-sm mt-2">Tap to upload</Text>
                                        <Text className="text-xs text-gray-400 mt-1">JPG, PNG supported</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    ))}
                </View>

                {/* Progress Indicator */}
                <View className="bg-white p-4 rounded-xl mb-6 border border-gray-100">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-sm font-semibold text-[#002147]">Upload Progress</Text>
                        <Text className="text-sm font-bold text-[#002147]">
                            {documents.filter(d => d.uri).length}/3
                        </Text>
                    </View>
                    <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <View 
                            className="h-full bg-[#28A745] rounded-full"
                            style={{ width: `${(documents.filter(d => d.uri).length / 3) * 100}%` }}
                        />
                    </View>
                </View>

                {/* Submit Button */}
                <Button
                    className="bg-[#002147] h-14 rounded-full mb-6"
                    onPress={handleUpload}
                    disabled={isUploading || documents.some(d => !d.uri)}
                >
                    <Text className="text-white font-bold text-lg">
                        {isUploading ? 'Submitting Documents...' : `Submit All Documents (${documents.filter(d => d.uri).length}/3)`}
                    </Text>
                </Button>

                {/* Info Box */}
                <View className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <View className="flex-row items-start">
                        <Feather name="info" size={20} color="#002147" style={{ marginTop: 2, marginRight: 12 }} />
                        <View className="flex-1">
                            <Text className="text-[#002147] font-semibold mb-2">Verification Process</Text>
                            <Text className="text-[#002147] text-sm leading-5">
                                • All 3 documents are required for verification{'\n'}
                                • Admin review typically takes 24-48 hours{'\n'}
                                • You'll be notified via email once approved{'\n'}
                                • Ensure documents are clear and legible
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScreenScrollView>
    );
}

