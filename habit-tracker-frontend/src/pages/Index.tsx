
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Build better habits, <span className="text-primary">track your progress</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                A simple and intuitive habit tracker to help you build consistent routines and achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md h-80 md:h-96">
                <div className="absolute top-0 right-0 w-4/5 h-64 bg-card rounded-lg shadow-lg p-4 transform rotate-3 z-10">
                  <h3 className="font-medium mb-2">Today's Tasks</h3>
                  {['Morning meditation', 'Team meeting', 'Workout', 'Read a chapter'].map((task, i) => (
                    <div key={i} className={`flex items-center gap-2 py-2 ${i === 0 ? 'opacity-70 line-through' : ''}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                        {i === 0 && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span>{task}</span>
                    </div>
                  ))}
                  <div className="w-full bg-muted h-2 rounded-full mt-4">
                    <div className="bg-primary h-full w-1/4 rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-4/5 h-60 bg-card rounded-lg shadow-lg p-4 transform -rotate-2">
                  <div className="grid grid-cols-7 gap-1">
                    {Array(7).fill(0).map((_, i) => (
                      <div key={i} className="text-center text-xs py-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                      </div>
                    ))}
                    {Array(31).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`text-center text-xs py-2 rounded-full ${
                          [3, 4, 5, 6, 10, 11, 12, 13].includes(i) 
                            ? 'bg-secondary/20' 
                            : [7, 8, 9].includes(i) 
                              ? 'bg-amber-500/20'
                              : [14, 15, 16].includes(i)
                                ? 'bg-destructive/10'
                                : 'bg-muted'
                        } ${i === 17 ? 'border-2 border-primary' : ''}`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything you need to build better habits</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Simple, powerful tools to help you stay on track and reach your goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Track Daily Tasks',
                description: 'Keep track of recurring habits and one-time tasks in an easy-to-use interface.',
                icon: '📝'
              },
              {
                title: 'Visualize Progress',
                description: 'See your habits over time with a color-coded calendar view showing your streaks.',
                icon: '📊'
              },
              {
                title: 'Stay Accountable',
                description: 'Set reminders and track completion rates to keep yourself motivated.',
                icon: '🔔'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Basic',
                price: '$5',
                features: [
                  'Up to 10 daily tasks',
                  'Basic habit tracking',
                  'Daily reminders',
                  'No access to premium features'
                ],
                featured: false
              },
              {
                name: 'Premium',
                price: '$10',
                features: [
                  'Unlimited tasks and habits',
                  'Advanced analytics & insights',
                  'Customizable categories',
                  'Priority support',
                  'Connect your own account'
                ],
                featured: true
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`bg-card p-8 rounded-lg shadow-sm ${
                  plan.featured ? 'border-2 border-primary relative' : ''
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle className={`h-5 w-5 ${plan.featured ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.featured ? 'default' : 'outline'}
                  asChild
                >
                  <Link to="/register">
                    Get Started
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">HabitTracker</h2>
              <p className="text-sm text-muted-foreground">Build better habits, one day at a time</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Log In
              </Link>
              <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground">
                Sign Up
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HabitTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
