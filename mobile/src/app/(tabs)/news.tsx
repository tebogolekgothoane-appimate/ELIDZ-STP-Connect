import React from 'react';
import { View, Pressable, ScrollView, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderAvatar } from '@/components/HeaderAvatar';

export default function NewsScreen() {
  const news = [
    {
      id: '1',
      title: 'ELIDZ AGM Reflects on 2024/25 Performance and Reaffirms Commitment to Vision 2030',
      category: 'Corporate',
      date: 'November 13, 2025',
      excerpt: 'ELIDZ held its Annual General Meeting, presenting 2024/25 financial year performance highlights and strategic developments driving industrial growth.',
      image: 'trending-up',
    },
    {
      id: '2',
      title: 'ELIDZ Marks 10 Years of Clean Audits – A Decade of Excellence, Integrity, and Impact',
      category: 'Achievements',
      date: 'August 15, 2025',
      excerpt: 'ELIDZ announces its 10th consecutive clean audit opinion from the Auditor General of South Africa for the 2024/25 financial year.',
      image: 'award',
    },
    {
      id: '3',
      title: 'ELIDZ-STP Hosts an Innovative Training Workshop on Electric Vehicle Fundamentals',
      category: 'Training',
      date: 'March 27, 2025',
      excerpt: 'ELIDZ-STP hosted a five-day Professional Certificate of Competency in Fundamentals of Electric Vehicles training workshop.',
      image: 'zap',
    },
    {
      id: '4',
      title: 'THE ELIDZ Science and Technology Park Head Elected as IASP Africa Division President',
      category: 'Achievements',
      date: 'December 3, 2024',
      excerpt: 'Ludwe Macingwane, Head of ELIDZ-STP, has been elected as the new Africa Division President of the International Association of Science Parks.',
      image: 'star',
    },
    {
      id: '5',
      title: 'MEC FOR DEDEAT UNVEILS NEW 4IR COMPUTER LABORATORY AT UMTIZA HIGH SCHOOL',
      category: 'Community',
      date: 'October 31, 2024',
      excerpt: 'MEC for DEDEAT unveiled a state-of-the-art Community-Based Digital (4IR) Computer Laboratory at Umtiza High School in partnership with Microsoft South Africa.',
      image: 'monitor',
    },
    {
      id: '6',
      title: 'East London IDZ STP in partnership with UNISA launches Eastern Cape Innovation Challenge 2025',
      category: 'Partnership',
      date: 'Recent',
      excerpt: 'ELIDZ-STP in partnership with UNISA launched the Eastern Cape Innovation Challenge 2025, a province-wide initiative to drive socio-economic innovation.',
      image: 'users',
    },
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Corporate':
        return '#002147';
      case 'Achievements':
        return '#FF6600';
      case 'Training':
        return '#28A745';
      case 'Community':
        return '#17A2B8';
      case 'Partnership':
        return '#6F42C1';
      case 'Events':
        return '#E83E8C';
      default:
        return '#002147';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <LinearGradient
          colors={['#002147', '#003366']}
          className="pt-12 pb-6 px-6 rounded-b-[30px] shadow-lg"
        >
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-1">
              <Text className="text-white text-3xl font-bold mb-2">News</Text>
              <Text className="text-white/80 text-base">
                Stay updated with the latest from ELIDZ-STP
              </Text>
            </View>
            <HeaderAvatar />
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white/10 border border-white/20 h-12 rounded-xl px-4 mt-6 backdrop-blur-sm">
            <Feather name="search" size={20} color="rgba(255,255,255,0.7)" />
            <TextInput
              className="flex-1 ml-3 text-base text-white"
              placeholder="Search news..."
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>
        </LinearGradient>

        {/* News List */}
        <View className="px-6 mt-6">
          {news.map((item) => (
            <Pressable
              key={item.id}
              className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm active:opacity-95"
              onPress={() => router.push(`/news-detail?id=${item.id}`)}
            >
              <View className="flex-row items-start">
                <View 
                  className="w-14 h-14 rounded-xl justify-center items-center"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                >
                  <Feather name={item.image as any} size={24} color="#FFFFFF" />
                </View>
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <View 
                      className="px-3 py-1 rounded-lg"
                      style={{ backgroundColor: `${getCategoryColor(item.category)}20` }}
                    >
                      <Text 
                        className="text-xs font-semibold"
                        style={{ color: getCategoryColor(item.category) }}
                      >
                        {item.category}
                      </Text>
                    </View>
                    <Text className="text-gray-400 text-xs">
                      {item.date}
                    </Text>
                  </View>
                  <Text className="text-[#002147] text-base font-bold mb-2" numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm" numberOfLines={2}>
                    {item.excerpt}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

