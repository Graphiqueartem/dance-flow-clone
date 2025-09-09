
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { QualityPoints } from '@/types/performance';

interface QualityPointsFormProps {
  points: QualityPoints;
  onChange: (points: QualityPoints) => void;
}

const QualityPointsForm: React.FC<QualityPointsFormProps> = ({ points, onChange }) => {
  const handlePointChange = (category: keyof QualityPoints, value: number[]) => {
    onChange({
      ...points,
      [category]: value[0]
    });
  };

  const categories = [
    { key: 'timing' as keyof QualityPoints, label: 'Timing' },
    { key: 'reflex' as keyof QualityPoints, label: 'Reflex' },
    { key: 'smoothness' as keyof QualityPoints, label: 'Smoothness' },
    { key: 'creativity' as keyof QualityPoints, label: 'Creativity' },
    { key: 'technique' as keyof QualityPoints, label: 'Technique' },
    { key: 'overall' as keyof QualityPoints, label: 'Overall' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Quality Points (0-100)</h3>
      {categories.map(({ key, label }) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <Label>{label}</Label>
            <span className="text-sm font-medium">{points[key]}/100</span>
          </div>
          <Slider
            value={[points[key]]}
            onValueChange={(value) => handlePointChange(key, value)}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
        </div>
      ))}
      <div className="pt-4 border-t">
        <div className="text-lg font-semibold">
          Average Score: {Math.round(Object.values(points).reduce((a, b) => a + b, 0) / 6)}/100
        </div>
      </div>
    </div>
  );
};

export default QualityPointsForm;
