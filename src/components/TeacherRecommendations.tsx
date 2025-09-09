
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Teacher } from '@/types/performance';
import { Star, DollarSign, User, ExternalLink } from 'lucide-react';

interface TeacherRecommendationsProps {
  teachers: Teacher[];
  danceGenre: string;
}

const TeacherRecommendations: React.FC<TeacherRecommendationsProps> = ({ 
  teachers, 
  danceGenre 
}) => {
  const handleHireTeacher = (teacher: Teacher) => {
    // In a real app, this would redirect to a booking system
    console.log('Hiring teacher:', teacher.name);
    window.open(`mailto:${teacher.name.toLowerCase().replace(' ', '.')}@teachers.com?subject=Dance Lessons Inquiry`, '_blank');
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
          <User className="h-6 w-6 text-indigo-600" />
          Recommended Teachers for {danceGenre}
        </CardTitle>
        <p className="text-gray-600">
          Take your skills to the next level with these expert instructors
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="border border-indigo-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {teacher.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-700">{teacher.rating}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    <span>{teacher.price}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    {teacher.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    {teacher.danceGenres.slice(0, 3).map((genre) => (
                      <Badge 
                        key={genre} 
                        variant="outline" 
                        className="text-xs bg-indigo-50 text-indigo-700 border-indigo-300"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => handleHireTeacher(teacher)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Hire to Improve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherRecommendations;
