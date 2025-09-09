import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trophy, Crown, Star, Award, Calendar, Users, Gift, Target } from 'lucide-react';
import Navigation from './Navigation';

interface GlobalPrizeProgramProps {
  onBack?: () => void;
  isEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

const GlobalPrizeProgram: React.FC<GlobalPrizeProgramProps> = ({ onBack, isEnabled = false, onToggle }) => {
  // If this is being used as a toggle component (when isEnabled and onToggle are provided)
  if (typeof isEnabled === 'boolean' && onToggle) {
    return (
      <Card className="mb-6 border-2 border-gradient-to-r from-yellow-400 to-orange-400">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">🏆 Enter Global Competition</h3>
                <p className="text-gray-600">Compete for cash prizes and global recognition!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={isEnabled}
                onCheckedChange={onToggle}
                className="data-[state=checked]:bg-yellow-500"
              />
              <span className="text-sm font-medium">
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
          {isEnabled && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>🎉 Global Competition Enabled!</strong> Your performance will be scored for the global leaderboard and you'll be eligible for monthly cash prizes up to $5,000!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Otherwise, render the full Global Prize Program page
  return (
    <div className="min-h-screen bg-gray-50">
      {onBack && <Navigation onBack={onBack} title="Global Prize Program" />}
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-8 rounded-2xl text-white mb-8">
            <Crown className="h-20 w-20 mx-auto mb-4 drop-shadow-lg" />
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              🏆 Global Prize Program
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Compete with dancers worldwide for amazing prizes, recognition, and the chance to be featured as our Global Dance Champion!
            </p>
          </div>
        </div>

        {/* Prize Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Grand Prize</CardTitle>
              <Badge className="bg-yellow-500 text-yellow-900 mx-auto">$5,000 Cash</Badge>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-gray-600 text-lg leading-relaxed">
                Monthly grand prize winner receives cash prize plus featured spotlight on our platform.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• $5,000 Cash Prize</li>
                <li>• Featured Profile</li>
                <li>• Social Media Spotlight</li>
                <li>• Winner's Certificate</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Category Winners</CardTitle>
              <Badge className="bg-purple-500 text-white mx-auto">$1,000 Each</Badge>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-gray-600 text-lg leading-relaxed">
                Best performance in each dance category wins monthly category prize.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hip Hop Champion</li>
                <li>• Contemporary Champion</li>
                <li>• Ballet Champion</li>
                <li>• Latin Champion</li>
                <li>• + More Categories</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-green-50">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Weekly Prizes</CardTitle>
              <Badge className="bg-blue-500 text-white mx-auto">$250 Weekly</Badge>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-gray-600 text-lg leading-relaxed">
                Every week, outstanding performances are rewarded with prizes and recognition.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• $250 Cash Prize</li>
                <li>• Feature on Homepage</li>
                <li>• Judge Recognition</li>
                <li>• Bonus Platform Credits</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-8">
              How the Competition Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">1. Submit</h3>
                <p className="text-gray-600">Submit your best dance performance with our premium scoring option.</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">2. Judge Review</h3>
                <p className="text-gray-600">Expert judges evaluate your performance using our comprehensive scoring system.</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-green-600 to-yellow-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">3. Ranking</h3>
                <p className="text-gray-600">Performances are ranked globally based on judge scores and community engagement.</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-600 to-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">4. Win Prizes</h3>
                <p className="text-gray-600">Top performers receive cash prizes, recognition, and global spotlight.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competition Schedule */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Competition Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-blue-900">Weekly Competitions</h3>
                <p className="text-blue-700 mb-3">Every Monday - Sunday</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Submit anytime during the week</li>
                  <li>• Winners announced every Monday</li>
                  <li>• $250 weekly prize</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-purple-900">Monthly Championships</h3>
                <p className="text-purple-700 mb-3">1st of every month</p>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Category winners selected</li>
                  <li>• Grand prize awarded</li>
                  <li>• Featured on platform</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-yellow-900">Annual Grand Championship</h3>
                <p className="text-yellow-700 mb-3">December 31st</p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Best of the year competition</li>
                  <li>• $25,000 grand prize</li>
                  <li>• Global recognition</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rules and Eligibility */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Competition Rules & Eligibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Eligibility Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Must be 13 years or older</li>
                  <li>• Original choreography preferred</li>
                  <li>• High-quality video submission</li>
                  <li>• Must opt-in for global scoring</li>
                  <li>• Performance must be family-friendly</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Judging Criteria</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Technical skill and execution</li>
                  <li>• Timing and rhythm</li>
                  <li>• Creativity and originality</li>
                  <li>• Stage presence and expression</li>
                  <li>• Overall performance quality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Compete?</h2>
              <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                Join thousands of dancers competing for prizes and global recognition. Submit your performance today!
              </p>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={() => window.location.href = '/'}
              >
                <Trophy className="mr-2 h-5 w-5" />
                Submit Performance Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GlobalPrizeProgram;
