import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const faqs = [
    {
      question: "How do I submit my dance video?",
      answer: "Navigate to our Performance Review Form and follow the simple upload process. Videos should be MP4, MOV, or AVI format, maximum 500MB."
    },
    {
      question: "What are the age categories for competitions?",
      answer: "We have two main categories: Youth (8-17 years) and Adult (18+ years). Some events may have additional age brackets."
    },
    {
      question: "Can I register for multiple regional events?",
      answer: "Yes! You can register for as many regional events as you'd like. Each registration is separate and gives you multiple chances to qualify."
    },
    {
      question: "How much does it cost to enter?",
      answer: "Online submissions are free for basic entry. Live event registration and premium critiques have separate fees detailed on our How to Enter page."
    },
    {
      question: "When will I receive feedback on my performance?",
      answer: "Standard feedback is provided within 2-3 weeks. Premium critique customers receive detailed feedback within 5-7 business days."
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Mail className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            Contact Us - Help & Support
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Questions? Reach out anytime. We're here to help you dance your best.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Questions? Reach out anytime. We're here to help you dance your best.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 sm:mb-16">
          {/* Contact Form */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins font-bold text-foreground flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help you..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-turquoise/10 border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-turquoise mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@lovedancelive.com</p>
                    <p className="text-muted-foreground">support@lovedancelive.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-baby-pink/10 border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-baby-pink mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+1 (555) 123-DANCE</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-light-blue/10 border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-light-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Global Headquarters</h3>
                    <p className="text-muted-foreground">123 Dance Street</p>
                    <p className="text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/performance-review-form">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="#faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;