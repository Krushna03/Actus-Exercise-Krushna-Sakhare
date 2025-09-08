import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://randomuser.me/api/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUser(data?.results[0]);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to load user.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleRefresh = () => {
    fetchUser();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-[#5c93d1] h-32"></div>
          
          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-16 mb-4">
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-48 h-48 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {user.name.first} {user.name.last}
              </h1>
              <p className="text-gray-600 break-all">
                {user.email}
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-lg transition duration-200 transform hover:scale-105 shadow-md cursor-pointer"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;