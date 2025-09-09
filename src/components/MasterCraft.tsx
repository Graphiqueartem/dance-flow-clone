import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Video, Globe } from "lucide-react";

const MasterCraft = () => {
  const features = [
    {
      icon: <Star className="h-8 w-8" />,
      title: "Expert instructors from 5 continents",
      description: "Learn from world-renowned choreographers and industry professionals"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Small class sizes for personalized attention", 
      description: "Get individual feedback and guidance in intimate learning environments"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Live and recorded sessions available",
      description: "Join live sessions or learn at your own pace with recorded content"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Master Your Craft
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Learn from world-renowned choreographers and judges through our exclusive workshops 
              and online classes. Perfect your technique, explore new styles, and get personalized feedback.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-dance-teal flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                Browse Workshops
              </Button>
              <Button variant="outline" size="lg">
                Online Classes
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-dance-teal/10 to-dance-pink/10 border-none">
              <CardContent className="p-0 text-center">
                <Globe className="h-24 w-24 text-dance-teal mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Global Learning Network
                </h3>
                <p className="text-muted-foreground mb-6">
                  Connect with dancers and instructors from around the world in our 
                  comprehensive learning ecosystem.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-dance-teal">50+</div>
                    <div className="text-sm text-muted-foreground">Expert Instructors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dance-pink">100+</div>
                    <div className="text-sm text-muted-foreground">Workshop Sessions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dance-teal">24/7</div>
                    <div className="text-sm text-muted-foreground">Access</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dance-pink">15+</div>
                    <div className="text-sm text-muted-foreground">Dance Styles</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterCraft;