import { Button } from "@/components/ui/button";
import { Play, Upload, Eye } from "lucide-react";
import heroImage from "@/assets/hero-dance.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-hero-gradient flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-dance-pink/20 rounded-full backdrop-blur-sm"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 transform rotate-45 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Where Passion Meets
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-dance-pink">
            Performance
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-white/90 font-medium">
          Live & Online Dance Competition Platform
        </p>
        
        <p className="text-lg mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
          Join thousands of dancers worldwide. Compete live in our global cities or submit your 
          performance online to get expert feedback and win amazing prizes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button variant="heroSolid" size="lg" className="min-w-48">
            <Play className="mr-2 h-5 w-5" />
            Enter Competition
          </Button>
          
          <Button variant="hero" size="lg" className="min-w-48">
            <Upload className="mr-2 h-5 w-5" />
            Submit Dance Video
          </Button>
          
          <Button variant="hero" size="lg" className="min-w-48">
            <Eye className="mr-2 h-5 w-5" />
            Watch Live
          </Button>
        </div>

        {/* Bottom CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 flex-1 sm:flex-none">
            <Play className="mr-2 h-4 w-4" />
            Enter Competition
          </Button>
          
          <Button variant="heroSolid" size="lg" className="flex-1 sm:flex-none min-w-64">
            <Upload className="mr-2 h-4 w-4" />
            Submit Your Dance Video
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;