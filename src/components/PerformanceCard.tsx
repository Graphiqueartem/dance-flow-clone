
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Performance } from '@/types/performance';
import { User, Mail, Calendar, Video, Play, CheckCircle, Star, Crown, Globe } from 'lucide-react';

interface PerformanceCardProps {
  performance: Performance;
  type: 'pending' | 'completed';
  onSelect?: (performance: Performance) => void;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  performance,
  type,
  onSelect
}) => {
  const isPending = type === 'pending';
  const cardClassName = isPending 
    ? "border rounded-xl p-6 hover:bg-orange-50 cursor-pointer transition-all hover:shadow-lg border-orange-100 group"
    : "border rounded-xl p-6 bg-green-50 border-green-200";

  return (
    <div
      className={cardClassName}
      onClick={isPending ? () => onSelect?.(performance) : undefined}
    >
      {/* Performance Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className={`font-bold text-gray-900 mb-2 ${isPending ? 'text-xl group-hover:text-orange-700 transition-colors' : 'text-lg'}`}>
            {performance.performance_title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{performance.performer_name}</span>
          </div>
          {isPending && (
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <Mail className="h-4 w-4" />
              <span>{performance.email}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {performance.country}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              {performance.language}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              {performance.dance_genre}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isPending ? (
            <>
              <Badge 
                variant={performance.feedback_type === 'PAID' ? 'default' : 'secondary'}
                className={performance.feedback_type === 'PAID' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-gray-100 text-gray-700'}
              >
                {performance.feedback_type === 'PAID' ? '💎 Premium' : '🆓 Free'}
              </Badge>
              {performance.platinum_upgrade && (
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                  <Crown className="h-3 w-3 mr-1" />
                  Platinum
                </Badge>
              )}
              {performance.global_entry && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Globe className="h-3 w-3 mr-1" />
                  Global
                </Badge>
              )}
            </>
          ) : (
            <>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Reviewed
              </Badge>
              {performance.platinum_upgrade && (
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                  <Crown className="h-3 w-3 mr-1" />
                  Platinum
                </Badge>
              )}
              {performance.global_entry && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Globe className="h-3 w-3 mr-1" />
                  Global
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {/* Performance Description */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {performance.performance_description}
        </p>
      </div>

      {/* Performance Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{performance.submitted_at ? new Date(performance.submitted_at).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            <span>Video Submission</span>
          </div>
        </div>
      </div>

      {/* Feedback Summary for completed or Action Button for pending */}
      {isPending ? (
        <div className="flex justify-end">
          <Button 
            size="sm" 
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-md group-hover:shadow-lg transition-all"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Review
          </Button>
        </div>
      ) : (
        performance.feedback && (
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Overall Score: {performance.feedback.qualityPoints ? 
                    Math.round(
                      (performance.feedback.qualityPoints.timing + 
                       performance.feedback.qualityPoints.reflex + 
                       performance.feedback.qualityPoints.smoothness + 
                       performance.feedback.qualityPoints.creativity + 
                       performance.feedback.qualityPoints.technique + 
                       performance.feedback.qualityPoints.overall) / 6
                    ) : 0}/100
                  </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                {performance.feedback.submitted_at ? new Date(performance.feedback.submitted_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>

            {/* Quality Points Bar */}
            {performance.feedback.qualityPoints && (
              <div className="space-y-2">
                {Object.entries(performance.feedback.qualityPoints).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 capitalize w-16">{key}:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-8">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Feedback Preview */}
            <div className="mt-3 pt-3 border-t border-green-100">
              <p className="text-xs text-gray-600 line-clamp-2">
                {performance.feedback.text_feedback}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PerformanceCard;
