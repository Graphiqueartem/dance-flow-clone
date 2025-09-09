import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Users, Award, BookOpen } from "lucide-react";

const GlobalCommunity = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Global Dance Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              LoveDanceLive connects dancers from around the world through live competitions, 
              online submissions, and expert mentorship. Whether you're a beginner or professional, 
              find your stage with us.
            </p>
            <Button variant="default" size="lg">
              Learn Our Story
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center border-l-4 border-l-dance-teal">
              <CardContent className="p-0">
                <Globe className="h-12 w-12 text-dance-teal mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                <div className="text-muted-foreground">Global Cities</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center border-l-4 border-l-dance-pink">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-dance-pink mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
                <div className="text-muted-foreground">Active Dancers</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center border-l-4 border-l-dance-pink">
              <CardContent className="p-0">
                <Award className="h-12 w-12 text-dance-pink mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">500+</div>
                <div className="text-muted-foreground">Competitions</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center border-l-4 border-l-dance-teal">
              <CardContent className="p-0">
                <BookOpen className="h-12 w-12 text-dance-teal mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">100+</div>
                <div className="text-muted-foreground">Expert Judges</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCommunity;