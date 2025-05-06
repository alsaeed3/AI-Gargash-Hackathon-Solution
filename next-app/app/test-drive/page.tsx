'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function TestDrivePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    carInterest: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format the date and time for the API request
      const appointmentDate = new Date(`${formData.date}T${formData.time}`);
      
      // Create the appointment through our API
      await axios.post('/api/appointments', {
        appointmentType: 'test-drive',
        appointmentDate,
        notes: formData.message,
        contactDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      });
      
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error scheduling test drive:', error);
      toast.error('Failed to schedule test drive. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      carInterest: '',
      message: ''
    });
    setShowSuccessDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Schedule a Test Drive</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Experience the thrill of driving one of our premium vehicles. Fill out the form below to schedule a test drive at your convenience.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Test Drive Appointment
            </CardTitle>
            <CardDescription>
              Please provide your details to schedule your test drive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="+1 (555) 000-0000" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carInterest">Vehicle of Interest (Optional)</Label>
                  <Input 
                    id="carInterest" 
                    name="carInterest" 
                    placeholder="e.g., BMW 7 Series"
                    value={formData.carInterest}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input 
                    id="time" 
                    name="time" 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information (Optional)</Label>
                <textarea
                  id="message"
                  name="message"
                  className="min-h-20 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any specific requirements or questions..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Scheduling..." : "Schedule Test Drive"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Drive Scheduled!</DialogTitle>
              <DialogDescription>
                Your test drive has been successfully scheduled. We'll send a confirmation to your email shortly.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-neutral-50 p-4 rounded-md border border-neutral-100 text-center">
              <p className="font-medium">{formData.date} at {formData.time}</p>
              <p className="text-sm text-neutral-500 mt-1">Our team will reach out to confirm all details.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => router.push('/')} variant="outline">
                Return Home
              </Button>
              <Button onClick={handleReset}>
                Schedule Another
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}