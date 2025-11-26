import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/ui/text';
import { PanoramaViewer } from '@/components/mixed-experiences/PanoramaViewer';
import { FACILITIES, getFacilityById, getTenantsByLocation, getVRTourDataById } from '@/data/vrToursData';

type ViewMode = 'panorama' | 'sections';
type ScreenMode = 'list' | 'detail' | 'vr-tour';

export default function ServicesScreen() {
	const params = useLocalSearchParams<{ id?: string }>();
	const [screenMode, setScreenMode] = useState<ScreenMode>('list');
	const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
	const [selectedService, setSelectedService] = useState<any | null>(null);

	// Use facility ID from params or selected facility
	const facilityId = params.id || selectedFacilityId;

	const tourData = useMemo(() => facilityId ? getVRTourDataById(facilityId) : null, [facilityId]);
	const facilityMeta = useMemo(() => facilityId ? getFacilityById(facilityId) : null, [facilityId]);
	const tenants = useMemo(
		() => (facilityMeta ? getTenantsByLocation(facilityMeta.location) : []),
		[facilityMeta]
	);

	const [viewMode, setViewMode] = useState<ViewMode>('panorama');
	const [currentSection, setCurrentSection] = useState(0);
	const [currentSceneId, setCurrentSceneId] = useState<string | null>(null);

	useEffect(() => {
		setCurrentSection(0);
		setCurrentSceneId(null);
		setViewMode('panorama');
	}, [facilityId]);

	// Handle facility selection
	const handleFacilitySelect = (facilityId: string) => {
		setSelectedFacilityId(facilityId);
		setSelectedService(null);
		setScreenMode('detail');
	};

	// Handle service selection for VR tour
	const handleServiceSelect = (service: any) => {
		if (service.hasVR) {
			setSelectedService(service);
			setCurrentSceneId(service.vrSceneId || tourData?.initialSceneId);
			setScreenMode('vr-tour');
		}
	};

	// Handle back to list
	const handleBackToList = () => {
		setSelectedFacilityId(null);
		setSelectedService(null);
		setScreenMode('list');
		router.setParams({});
	};

	// Handle back to facility detail
	const handleBackToDetail = () => {
		setSelectedService(null);
		setScreenMode('detail');
	};

	const activeSceneId = currentSceneId ?? tourData?.initialSceneId;
	const activeScene = activeSceneId && tourData?.scenes ? tourData.scenes[activeSceneId] : null;
	const hasSections = tourData?.sections ? tourData.sections.length > 0 : false;

	const handleHotspotClick = (hotspotId: string) => {
		if (!activeScene) return;
		const hotspot = activeScene.hotspots.find((h: any) => h.id === hotspotId);
		if (hotspot?.targetSceneId) {
			setCurrentSceneId(hotspot.targetSceneId);
		}
	};

	return (
		<View className="flex-1">
			{screenMode === 'list' && (
				<ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 40 }}>
					{/* Header */}
					<View className="px-6 pt-12 pb-6 bg-white shadow-sm">
						<Text className="text-2xl font-bold text-[#002147] mb-2">IDZ STP Services</Text>
						<Text className="text-gray-600 text-base">
							Explore our world-class facilities and innovation centers
						</Text>
					</View>

					{/* Facilities List */}
					<View className="px-6 py-4">
						{FACILITIES.map((facility, index) => (
							<Pressable
								key={facility.id}
								className="bg-white rounded-2xl mb-4 p-4 shadow-sm border border-gray-100 active:opacity-95"
								onPress={() => handleFacilitySelect(facility.id)}
							>
								<View className="flex-row items-center">
									<View className="w-16 h-16 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: facility.color }}>
										<Feather name={facility.icon as any} size={28} color="#FFFFFF" />
									</View>
									<View className="flex-1">
										<Text className="text-lg font-bold text-[#002147] mb-1">{facility.name}</Text>
										<Text className="text-gray-600 text-sm mb-2">{facility.description}</Text>
										<View className="flex-row items-center">
											<Text className="text-xs text-gray-500">{facility.location}</Text>
											<Feather name="chevron-right" size={16} color="#FF6600" style={{ marginLeft: 'auto' }} />
										</View>
									</View>
								</View>
							</Pressable>
						))}
					</View>
				</ScrollView>
			)}

			{screenMode === 'detail' && tourData && facilityMeta && (
				<ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 40 }}>
					{/* Header */}
					<View className="px-6 pt-12 pb-6 bg-white shadow-sm">
						<View className="flex-row items-center mb-4">
							<Pressable onPress={handleBackToList} className="p-2 mr-3">
								<Feather name="arrow-left" size={24} color="#002147" />
							</Pressable>
							<View className="w-12 h-12 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: facilityMeta.color }}>
								<Feather name={facilityMeta.icon as any} size={24} color="#FFFFFF" />
							</View>
							<View className="flex-1">
								<Text className="text-2xl font-bold text-[#002147]">{facilityMeta.name}</Text>
								<Text className="text-gray-600 text-sm">{facilityMeta.location}</Text>
							</View>
						</View>
						<Text className="text-gray-600 text-base">{facilityMeta.description}</Text>
					</View>

					{/* Services List */}
					<View className="px-6 py-4">
						<Text className="text-xl font-bold text-[#002147] mb-4">Available Services</Text>
						{tourData.sections.map((service, index) => (
							<Pressable
								key={index}
								className="bg-white rounded-2xl mb-4 p-4 shadow-sm border border-gray-100 active:opacity-95"
								onPress={() => handleServiceSelect(service)}
							>
								<View className="flex-row items-center justify-between">
									<View className="flex-1">
										<Text className="text-lg font-bold text-[#002147] mb-2">{service.title}</Text>
										<Text className="text-gray-600 text-sm mb-3">{service.description}</Text>
										<View className="flex-row flex-wrap">
											{service.details.slice(0, 3).map((detail: string, i: number) => (
												<View key={i} className="bg-blue-50 px-2 py-1 rounded-md mr-2 mb-1">
													<Text className="text-[#002147] text-[10px] font-medium">{detail}</Text>
												</View>
											))}
										</View>
									</View>
									{service.hasVR ? (
										<View className="ml-4">
											<Feather name="eye" size={24} color="#FF6600" />
										</View>
									) : null}
								</View>
							</Pressable>
						))}
					</View>

					{/* Tenants */}
					{tenants.length > 0 && (
						<View className="px-6 py-4">
							<Text className="text-xl font-bold text-[#002147] mb-4">Tenants in this Facility</Text>
							{tenants.map(tenant => (
								<View key={tenant.id} className="bg-white p-4 rounded-xl mb-3 flex-row items-center border border-gray-100">
									<View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
										<Text className="text-primary font-bold">{tenant.name.charAt(0)}</Text>
									</View>
									<View className="flex-1">
										<Text className="font-semibold text-foreground">{tenant.name}</Text>
										<Text className="text-xs text-muted-foreground">{tenant.description}</Text>
									</View>
								</View>
							))}
						</View>
					)}
				</ScrollView>
			)}

			{screenMode === 'vr-tour' && tourData && facilityMeta && selectedService && (
				<View className="flex-1 bg-background">
					<View className="px-6 pt-12 pb-6 flex-row items-center justify-between" style={{ backgroundColor: tourData.color }}>
						<Pressable onPress={handleBackToDetail} className="p-2 bg-white/20 rounded-full">
							<Feather name="arrow-left" size={24} color="#FFFFFF" />
						</Pressable>
						<View className="items-center">
							<Text className="text-white text-lg font-bold">{selectedService.title}</Text>
							<Text className="text-white/80 text-xs">
								{viewMode === 'panorama' && activeScene ? activeScene.title : 'Virtual Tour'}
							</Text>
						</View>
						<View className="flex-row gap-2">
							<Pressable
								className={`p-2 rounded-full ${viewMode === 'panorama' ? 'bg-white text-primary' : 'bg-white/20'}`}
								onPress={() => setViewMode('panorama')}
							>
								<Feather name="globe" size={20} color={viewMode === 'panorama' ? tourData.color : '#FFFFFF'} />
							</Pressable>
							<Pressable
								className={`p-2 rounded-full ${viewMode === 'sections' ? 'bg-white text-primary' : 'bg-white/20'}`}
								onPress={() => hasSections && setViewMode('sections')}
								disabled={!hasSections}
							>
								<Feather name="list" size={20} color={viewMode === 'sections' ? tourData.color : '#FFFFFF'} />
							</Pressable>
						</View>
					</View>

					{/* VR Panorama Viewer */}
					{viewMode === 'panorama' && activeScene ? (
						<PanoramaViewer
							imageUrl={activeScene.image}
							title={activeScene.title}
							hotspots={activeScene.hotspots}
							onHotspotClick={handleHotspotClick}
						/>
					) : (
						<ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
							{/* Service Overview */}
							<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
								<View className="flex-row items-center mb-4">
									<View className="w-12 h-12 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: facilityMeta.color }}>
										<Feather name={facilityMeta.icon as any} size={24} color="#FFFFFF" />
									</View>
									<View className="flex-1">
										<Text className="text-xl font-bold text-foreground">{selectedService.title}</Text>
										<Text className="text-sm text-muted-foreground">{facilityMeta.location}</Text>
									</View>
								</View>
								<Text className="text-base text-muted-foreground leading-6">
									{selectedService.description}
								</Text>
							</View>

							{/* Service Details */}
							<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
								<Text className="text-lg font-semibold text-foreground mb-4">Key Features & Services</Text>
								{selectedService.details.map((detail: string, index: number) => (
									<View key={index} className="flex-row items-center mb-3">
										<View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: tourData.color }} />
										<Text className="text-base text-foreground flex-1">{detail}</Text>
									</View>
								))}
							</View>

							{/* Tenants */}
							<View className="mb-6">
								<Text className="text-lg font-semibold text-foreground mb-4">Tenants in this Facility</Text>
								{tenants.length === 0 && (
									<Text className="text-muted-foreground">No tenants listed for this facility.</Text>
								)}
								{tenants.map(tenant => (
									<View key={tenant.id} className="bg-card p-4 rounded-xl mb-3 flex-row items-center border border-border">
										<View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
											<Text className="text-primary font-bold">{tenant.name.charAt(0)}</Text>
										</View>
										<View className="flex-1">
											<Text className="font-semibold text-foreground">{tenant.name}</Text>
											<Text className="text-xs text-muted-foreground">{tenant.description}</Text>
										</View>
									</View>
								))}
							</View>
						</ScrollView>
					)}
				</View>
			)}
		</View>
	);
}