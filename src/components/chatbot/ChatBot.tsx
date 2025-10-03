import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, MessageCircle, Send } from 'lucide-react';

interface Message {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hey there! Welcome to LoveDanceLive. How can I help you today? You can ask about competitions, how to enter, workshops, or anything else.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greeting responses
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! How can I assist you today? Feel free to ask about competitions, submissions, workshops, or anything else!";
    }

    // Competition queries
    if (lowerMessage.includes('competition') || lowerMessage.includes('compete')) {
      return "We host live regional qualifiers in Mexico City, Sydney, Johannesburg, Seoul, and London! You can also submit your dance video online from anywhere. Visit our Competitions page or How to Enter page for more details. Would you like to know about registration?";
    }

    // How to enter queries
    if (lowerMessage.includes('enter') || lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      return "Great question! You have two options:\n1. Register for live events in one of our 5 cities\n2. Submit your dance video online\n\nHead to our 'How to Enter' page for step-by-step instructions. Need help with registration?";
    }

    // Video submission queries
    if (lowerMessage.includes('video') || lowerMessage.includes('submit') || lowerMessage.includes('upload')) {
      return "To submit your video:\n1. Record your performance (2-5 minutes, MP4/MOV/AVI, max 500MB)\n2. Go to our submission page\n3. Fill out your details\n4. Optional: Add premium critique for expert feedback\n\nWant to know about video requirements?";
    }

    // Workshop queries
    if (lowerMessage.includes('workshop') || lowerMessage.includes('class') || lowerMessage.includes('learn')) {
      return "We offer amazing workshops in all five regional cities covering Hip Hop, Contemporary, Latin, Jazz, and Street Dance! Can't attend in person? Check out our Online Classes portal for year-round learning. Would you like to see the schedule?";
    }

    // Judges queries
    if (lowerMessage.includes('judge') || lowerMessage.includes('feedback') || lowerMessage.includes('critique')) {
      return "Our expert judges provide valuable feedback on all performances! You can get premium critiques for detailed analysis. Want to learn more about our judges or premium feedback options?";
    }

    // Pricing queries
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee') || lowerMessage.includes('pay')) {
      return "Online video submissions have a basic free entry option. Live event registrations and premium critiques have separate fees. Check our 'How to Enter' page for detailed pricing. Need specific pricing info?";
    }

    // Location queries
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('city')) {
      return "We host live events in 5 amazing cities:\n• Mexico City 🇲🇽\n• Sydney 🇦🇺\n• Johannesburg 🇿🇦\n• Seoul 🇰🇷\n• London 🇬🇧\n\nPlus, you can join from anywhere by submitting online! Which location interests you?";
    }

    // Age/category queries
    if (lowerMessage.includes('age') || lowerMessage.includes('category') || lowerMessage.includes('youth') || lowerMessage.includes('adult')) {
      return "We have two main age categories:\n• Youth (8-17 years)\n• Adult (18+ years)\n\nSome events may have additional age brackets. Solo, duet, and group performances are all welcome!";
    }

    // Prize queries
    if (lowerMessage.includes('prize') || lowerMessage.includes('win') || lowerMessage.includes('award')) {
      return "Winners can earn amazing prizes including cash awards, masterclasses with professional judges, featured performance spots, and more! Top performers from regional events qualify for the Grand Final in Dubai. Want to know more about prizes?";
    }

    // Grand Final queries
    if (lowerMessage.includes('final') || lowerMessage.includes('dubai')) {
      return "The Grand Final is held in Dubai and brings together the best performers from all regional qualifiers and top online submissions. It's the ultimate celebration of dance! Would you like to know how to qualify?";
    }

    // Contact/help queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "You can reach us at:\n📧 hello@lovedancelive.com\n📞 +1 (555) 123-DANCE\n\nOr visit our Contact page for the full contact form and FAQ section. How else can I help?";
    }

    // Schedule/dates queries
    if (lowerMessage.includes('when') || lowerMessage.includes('date') || lowerMessage.includes('schedule')) {
      return "Regional events run throughout the year in our 5 cities. Online submissions are accepted year-round! Check our Competitions page for specific dates and the full schedule. Want details for a specific city?";
    }

    // Default response
    return "I'm here to help! You can ask me about:\n• Competitions & how to enter\n• Workshops & online classes\n• Judges & feedback\n• Prizes & awards\n• Event locations & dates\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-96 shadow-2xl">
          <CardHeader className="bg-accent text-accent-foreground">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-poppins">LoveDanceLive Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-accent-foreground hover:bg-accent-foreground/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-accent-foreground/80 mt-1">Ask me anything about LoveDanceLive!</p>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;