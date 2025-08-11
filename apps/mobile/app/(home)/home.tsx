import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { http } from "@find/api-client";
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('discover');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  
  const { data, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await http.get("/users/me")).data as { user: any }
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const tabs = [
    { id: 'discover', label: 'Discover', icon: '💕' },
    { id: 'matches', label: 'Matches', icon: '❤️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const mockProfiles = [
    {
      id: 1,
      name: 'Sarah',
      age: 25,
      location: '2 miles away',
      bio: 'Adventure seeker and coffee lover ☕️',
      interests: ['Travel', 'Photography', 'Coffee']
    },
    {
      id: 2,
      name: 'Emma',
      age: 28,
      location: '5 miles away',
      bio: 'Passionate about travel and photography 📸',
      interests: ['Travel', 'Photography', 'Yoga']
    },
    {
      id: 3,
      name: 'Jessica',
      age: 24,
      location: '1 mile away',
      bio: 'Foodie and yoga enthusiast 🧘‍♀️',
      interests: ['Food', 'Yoga', 'Reading']
    }
  ];

  const renderProfileCard = (profile: any, index: number) => (
    <Animated.View 
      key={profile.id} 
      style={[
        styles.profileCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {profile.name}, {profile.age}
          </Text>
          <Text style={styles.profileLocation}>
            📍 {profile.location}
          </Text>
          <Text style={styles.profileBio} numberOfLines={2}>
            {profile.bio}
          </Text>
          <View style={styles.interestsContainer}>
            {profile.interests.slice(0, 2).map((interest: string, idx: number) => (
              <View key={idx} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.rejectButton]}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeButton]}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>⭐</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptButton]}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>♥</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'discover':
        return (
          <View style={styles.content}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Discover People</Text>
              <Text style={styles.sectionSubtitle}>Find your perfect match</Text>
            </View>
            {mockProfiles.map((profile, index) => renderProfileCard(profile, index))}
          </View>
        );
      case 'matches':
        return (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>❤️</Text>
            </View>
            <Text style={styles.emptyTitle}>No matches yet</Text>
            <Text style={styles.emptySubtitle}>Start swiping to find your perfect match!</Text>
            <TouchableOpacity style={styles.emptyActionButton}>
              <Text style={styles.emptyActionButtonText}>Start Discovering</Text>
            </TouchableOpacity>
          </View>
        );
      case 'messages':
        return (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>💬</Text>
            </View>
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptySubtitle}>Your conversations will appear here</Text>
            <TouchableOpacity style={styles.emptyActionButton}>
              <Text style={styles.emptyActionButtonText}>Find Matches</Text>
            </TouchableOpacity>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.content}>
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.profileAvatarContainer}>
                  <View style={styles.profileAvatar}>
                    <Text style={styles.profileAvatarText}>
                      {data?.user?.name?.charAt(0) || 'U'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.profileHeaderName}>
                  {data?.user?.name || 'User'}
                </Text>
                <Text style={styles.profileHeaderEmail}>
                  {data?.user?.email || 'user@example.com'}
                </Text>
              </View>
            </View>
            
            <View style={styles.profileCard}>
              <Text style={styles.settingsTitle}>Settings</Text>
              <View style={styles.settingsList}>
                {[
                  { label: 'Notifications', value: 'On', icon: '🔔' },
                  { label: 'Location', value: 'New York', icon: '📍' },
                  { label: 'Privacy', value: 'Public', icon: '🔒' },
                  { label: 'Help & Support', value: '', icon: '❓' }
                ].map((item, index) => (
                  <TouchableOpacity key={index} style={styles.settingItem} activeOpacity={0.7}>
                    <View style={styles.settingLeft}>
                      <Text style={styles.settingIcon}>{item.icon}</Text>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.settingRight}>
                      {item.value && (
                        <Text style={styles.settingValue}>{item.value}</Text>
                      )}
                      <Text style={styles.settingArrow}>›</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.appTitle}>FindYourMatch</Text>
            <Text style={styles.appSubtitle}>Find your perfect match</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.activeTab
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ec4899"
            colors={['#ec4899']}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#1e293b',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  appTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  appSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButtonText: {
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#1e293b',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ec4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileLocation: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 8,
  },
  profileBio: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  interestText: {
    color: '#ec4899',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rejectButton: {
    backgroundColor: '#ef4444',
  },
  superLikeButton: {
    backgroundColor: '#f59e0b',
  },
  acceptButton: {
    backgroundColor: '#22c55e',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(236, 72, 153, 0.2)',
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  emptyActionButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyActionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileAvatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  profileAvatarText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  profileHeaderName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileHeaderEmail: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
  },
  settingsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    color: '#94a3b8',
    fontSize: 14,
    marginRight: 8,
  },
  settingArrow: {
    color: '#94a3b8',
    fontSize: 18,
  },
});

