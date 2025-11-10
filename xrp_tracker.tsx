import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Users, Sparkles } from 'lucide-react';

export default function XRPTracker() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate starfield
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  const fetchBalance = async () => {
    if (!address.trim()) {
      setError('Please enter an XRP address');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch(`https://api.xrpscan.com/api/v1/account/${address}`);
      
      if (!response.ok) {
        throw new Error('Invalid address or network error');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchBalance();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {/* Milky way glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse" 
           style={{ animationDuration: '4s' }} />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              XRP Unity Tracker
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 text-purple-200">
            <Users className="w-5 h-5" />
            <p className="text-xl font-light">United in One Cause • Freedom Through Decentralization</p>
          </div>
        </div>

        {/* Search Card */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-300/30">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter XRP Address (e.g., rN7n7o...)"
                  className="w-full px-6 py-4 bg-white/20 border-2 border-purple-300/50 rounded-xl text-white placeholder-purple-200/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                />
              </div>
              <button
                onClick={fetchBalance}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 disabled:scale-100 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Track
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {data && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-300/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Balance */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-300/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-300" />
                    <h3 className="text-purple-200 text-sm font-semibold uppercase tracking-wide">XRP Balance</h3>
                  </div>
                  <p className="text-4xl font-bold text-white">
                    {data.xrpBalance ? parseFloat(data.xrpBalance).toLocaleString() : '0'}
                  </p>
                  <p className="text-purple-200 mt-1">XRP</p>
                </div>

                {/* Account Info */}
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-300/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-300" />
                    <h3 className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Account Status</h3>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">
                    {data.accountName || 'Active'}
                  </p>
                  <p className="text-blue-200 text-sm">
                    Sequence: {data.sequence || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Address Display */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-purple-300/20">
                <p className="text-purple-200 text-xs uppercase tracking-wide mb-1">Address</p>
                <p className="text-white font-mono text-sm break-all">{data.account}</p>
              </div>

              {/* Unity Message */}
              <div className="mt-6 text-center p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-lg border border-purple-300/20">
                <p className="text-purple-200 italic">
                  "Together we stand for financial freedom and decentralization"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Message */}
        <div className="text-center mt-12 text-purple-300/60">
          <p className="text-sm">✨ Building the future of finance, together ✨</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}