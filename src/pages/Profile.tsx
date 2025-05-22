import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Edit2, Users, Image, Heart, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';

interface TabProps {
  label: string;
  count: number;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { label: 'Posts', count: 245, icon: <MessageSquare size={18} /> },
  { label: 'Media', count: 128, icon: <Image size={18} /> },
  { label: 'Likes', count: 892, icon: <Heart size={18} /> },
  { label: 'Following', count: 234, icon: <Users size={18} /> },
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = true; // This would normally be determined by auth state

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isOwnProfile && (
                <button
                  className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                  aria-label="Change profile picture"
                >
                  <Edit2 size={16} className="text-gray-600" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Sarah Anderson</h1>
                  <p className="text-gray-600">@sarahanderson</p>
                </div>
                
                <div className="flex justify-center md:justify-start gap-3">
                  {isOwnProfile ? (
                    <Button
                      variant="outline"
                      size="md"
                      leftIcon={<Edit2 size={16} />}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant={isFollowing ? 'outline' : 'primary'}
                      size="md"
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  )}
                </div>
              </div>

              <p className="mt-4 text-gray-600 max-w-2xl">
                Product Designer & Developer. Creating user-friendly interfaces in React.
                Love exploring new technologies and sharing knowledge with the community.
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined March 2023</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">1.2k</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">843</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">245</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.label
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="text-gray-400">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900 mb-2">Post Title {index + 1}</h3>
              <p className="text-gray-600 text-sm">
                This is a sample post content. In a real application, this would be
                actual user-generated content.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>2 hours ago</span>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    <Heart size={16} />
                    <span>24</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    <MessageSquare size={16} />
                    <span>12</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;