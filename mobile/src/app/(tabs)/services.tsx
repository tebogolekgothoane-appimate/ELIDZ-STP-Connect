import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { PanoramaViewer } from '@/components/mixed-experiences/PanoramaViewer';
import { FACILITIES, getFacilityById, getTenantsByLocation, getVRTourDataById } from '@/data/vrToursData';

type ViewMode = 'panorama' | 'sections';
type ScreenMode = 'list' | 'detail';

export default function ServicesScreen() {
	const params = useLocalSearchParams<{ id?: string }>();
	const [screenMode, setScreenMode] = useState<ScreenMode>('list');
	const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

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
		setScreenMode('detail');
	};

	// Handle back to list
	const handleBackToList = () => {
		setSelectedFacilityId(null);
		setScreenMode('list');
		router.setParams({});
	};

	// Show list of facilities
	if (screenMode === 'list') {
		return (
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
		);
	}

	// Show facility detail with VR tour
	if (!tourData || !facilityMeta) {
		return (
			<ScreenScrollView>
				<View className="flex-1 items-center justify-center py-12 px-6">
					<Text className="text-xl font-semibold text-foreground mb-4">Facility unavailable</Text>
					<Text className="text-center text-muted-foreground mb-6">
						We could not find the requested facility. Please select a facility from the list.
					</Text>
					<Pressable
						className="px-6 py-3 rounded-full bg-primary"
						onPress={handleBackToList}
					>
						<Text className="text-white font-semibold">Back to Services</Text>
					</Pressable>
				</View>
			</ScreenScrollView>
		);
	}

	const activeSceneId = currentSceneId ?? tourData.initialSceneId;
	const activeScene = tourData.scenes[activeSceneId];
	const hasSections = tourData.sections.length > 0;
	const section = hasSections ? tourData.sections[currentSection] : undefined;

	const handleHotspotClick = (hotspotId: string) => {
		if (!activeScene) return;
		const hotspot = activeScene.hotspots.find(h => h.id === hotspotId);
		if (hotspot?.targetSceneId) {
			setCurrentSceneId(hotspot.targetSceneId);
		}
	};

	return (
		<View className="flex-1 bg-background">
			<View className="px-6 pt-12 pb-6 flex-row items-center justify-between" style={{ backgroundColor: tourData.color }}>
				<Pressable onPress={handleBackToList} className="p-2 bg-white/20 rounded-full">
					<Feather name="arrow-left" size={24} color="#FFFFFF" />
				</Pressable>
				<View className="items-center">
					<Text className="text-white text-lg font-bold">{tourData.name}</Text>
					<Text className="text-white/80 text-xs">
						{viewMode === 'panorama' && activeScene ? activeScene.title : 'Virtual Tour Details'}
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

			{viewMode === 'panorama' && activeScene ? (
				<PanoramaViewer
					imageUrl={activeScene.image}
					title={activeScene.title}
					hotspots={activeScene.hotspots}
					onHotspotClick={handleHotspotClick}
				/>
			) : (
				<ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
					{section ? (
						<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
							<View className="flex-row justify-between items-center mb-4 pb-4 border-b border-border">
								<View>
									<Text className="text-sm text-muted-foreground uppercase font-semibold">Current Location</Text>
									<Text className="text-2xl font-bold text-foreground mt-1">{section.title}</Text>
								</View>
								<View className="bg-primary/10 px-3 py-1 rounded-full">
									<Text className="text-primary font-bold">
										{currentSection + 1}/{tourData.sections.length}
									</Text>
								</View>
							</View>

							<Text className="text-base text-muted-foreground leading-6 mb-6">
								{section.description}
							</Text>

							<Text className="text-lg font-semibold text-foreground mb-4">Key Features</Text>
							{section.details.map((detail, index) => (
								<View key={index} className="flex-row items-center mb-3">
									<View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: tourData.color }} />
									<Text className="text-base text-foreground flex-1">{detail}</Text>
								</View>
							))}
						</View>
					) : (
						<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
							<Text className="text-lg font-semibold text-foreground mb-2">Tour Details coming soon</Text>
							<Text className="text-muted-foreground">
								This facility does not have sectioned details yet. Explore the panorama to view the space.
							</Text>
						</View>
					)}

					<View className="mb-6">
						<Text className="text-lg font-semibold text-foreground mb-4">Tenants in this Wing</Text>
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

			{/* Facility Services & Products Section */}
			{viewMode === 'sections' && (
				<ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
					{/* Facility Overview */}
					<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
						<View className="flex-row items-center mb-4">
							<View className="w-12 h-12 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: facilityMeta.color }}>
								<Feather name={facilityMeta.icon as any} size={24} color="#FFFFFF" />
							</View>
							<View className="flex-1">
								<Text className="text-xl font-bold text-foreground">{facilityMeta.name}</Text>
								<Text className="text-sm text-muted-foreground">{facilityMeta.location}</Text>
							</View>
						</View>
						<Text className="text-base text-muted-foreground leading-6">
							{facilityMeta.description}
						</Text>
					</View>

					{/* Services & Products */}
					{section ? (
						<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
							<View className="flex-row justify-between items-center mb-4 pb-4 border-b border-border">
								<View>
									<Text className="text-sm text-muted-foreground uppercase font-semibold">Services & Products</Text>
									<Text className="text-2xl font-bold text-foreground mt-1">{section.title}</Text>
								</View>
								<View className="bg-primary/10 px-3 py-1 rounded-full">
									<Text className="text-primary font-bold">
										{currentSection + 1}/{tourData.sections.length}
									</Text>
								</View>
							</View>

							<Text className="text-base text-muted-foreground leading-6 mb-6">
								{section.description}
							</Text>

							<Text className="text-lg font-semibold text-foreground mb-4">Key Services</Text>
							{section.details.map((detail, index) => (
								<View key={index} className="flex-row items-center mb-3">
									<View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: tourData.color }} />
									<Text className="text-base text-foreground flex-1">{detail}</Text>
								</View>
							))}
						</View>
					) : (
						<View className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
							<Text className="text-lg font-semibold text-foreground mb-2">Services coming soon</Text>
							<Text className="text-muted-foreground">
								This facility does not have detailed services yet. Explore the panorama to view the space.
							</Text>
						</View>
					)}

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

			{/* Section Navigation */}
			{viewMode === 'sections' && hasSections && (
				<View className="flex-row justify-between items-center p-6 border-t border-border bg-background">
					<Pressable
						className={`flex-row items-center ${currentSection === 0 ? 'opacity-50' : 'active:opacity-70'}`}
						onPress={() => setCurrentSection(Math.max(0, currentSection - 1))}
						disabled={currentSection === 0}
					>
						<Feather name="chevron-left" size={24} color="rgb(var(--foreground))" />
						<Text className="ml-2 font-semibold text-foreground">Previous</Text>
					</Pressable>

					<View className="flex-row gap-2">
						{tourData.sections.map((_, index) => (
							<View
								key={index}
								className={`w-2 h-2 rounded-full ${index === currentSection ? '' : 'bg-muted'}`}
								style={index === currentSection ? { backgroundColor: tourData.color } : {}}
							/>
						))}
					</View>

					<Pressable
						className={`flex-row items-center ${currentSection === tourData.sections.length - 1 ? 'opacity-50' : 'active:opacity-70'}`}
						onPress={() => setCurrentSection(Math.min(tourData.sections.length - 1, currentSection + 1))}
						disabled={currentSection === tourData.sections.length - 1}
					>
						<Text className="mr-2 font-semibold text-foreground">Next</Text>
						<Feather name="chevron-right" size={24} color="rgb(var(--foreground))" />
					</Pressable>
				</View>
			)}
		</View>
	);
}
