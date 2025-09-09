
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Performance } from '@/types/performance';
import PerformanceCard from './PerformanceCard';
import { Clock, CheckCircle, FileText } from 'lucide-react';

interface PerformanceListProps {
  performances: Performance[];
  type: 'pending' | 'completed';
  title: string;
  onSelectPerformance?: (performance: Performance) => void;
}

const PerformanceList: React.FC<PerformanceListProps> = ({
  performances,
  type,
  title,
  onSelectPerformance
}) => {
  const isPending = type === 'pending';
  const headerColor = isPending 
    ? 'bg-gradient-to-r from-orange-500 to-orange-600'
    : 'bg-gradient-to-r from-green-500 to-green-600';
  const icon = isPending ? Clock : CheckCircle;
  const Icon = icon;

  const emptyState = isPending ? {
    icon: CheckCircle,
    title: 'All caught up!',
    description: 'No assigned performances to review'
  } : {
    icon: FileText,
    title: 'No reviews yet',
    description: 'Completed reviews will appear here'
  };

  const EmptyIcon = emptyState.icon;

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className={`${headerColor} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {performances.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {performances.length === 0 ? (
          <div className="text-center py-12">
            <EmptyIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">{emptyState.title}</h3>
            <p className="text-gray-500">{emptyState.description}</p>
          </div>
        ) : (
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {performances.map((performance) => (
              <PerformanceCard
                key={performance.id}
                performance={performance}
                type={type}
                onSelect={onSelectPerformance}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceList;
