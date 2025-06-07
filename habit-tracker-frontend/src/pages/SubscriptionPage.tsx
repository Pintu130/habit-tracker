
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useStripe } from '@/context/StripeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, BadgeCheck } from 'lucide-react';

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { handleOneTimePayment, handleSubscriptionPayment, handleConnectOnboarding, isLoading } = useStripe();

  const currentPlan = user?.subscription?.type || 'basic';
  const isActive = user?.subscription?.status === 'active';

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$5/month',
      features: [
        'Up to 10 daily tasks',
        'Basic habit tracking',
        'Daily reminders',
        'No access to premium features',
      ],
      oneTimePrice: 499, // in cents
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$10/month',
      features: [
        'Unlimited tasks and habits',
        'Advanced analytics & insights',
        'Customizable categories',
        'Priority support',
        'Connect your own account',
      ],
      oneTimePrice: 999, // in cents
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Subscription</h1>
          <p className="text-muted-foreground">Choose the right plan for your needs</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden ${
                plan.id === currentPlan && isActive
                  ? 'border-primary shadow-md'
                  : ''
              }`}
            >
              {plan.id === currentPlan && isActive && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                    Current Plan
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.name}
                  {plan.id === 'premium' && <BadgeCheck className="h-5 w-5 text-primary" />}
                </CardTitle>
                <CardDescription>
                  <span className="text-xl font-bold">{plan.price}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full"
                  variant={plan.id === 'premium' ? 'default' : 'outline'}
                  onClick={() => handleSubscriptionPayment(plan.id as 'basic' | 'premium')}
                  disabled={isLoading || (plan.id === currentPlan && isActive)}
                >
                  {isLoading
                    ? 'Processing...'
                    : plan.id === currentPlan && isActive
                    ? 'Current Plan'
                    : `Subscribe to ${plan.id}`}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOneTimePayment(plan.oneTimePrice)}
                  disabled={isLoading}
                >
                  One-time payment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Stripe Connect Onboarding Section */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle>Connect Your Account</CardTitle>
            <CardDescription>
              Want to receive payments? Connect your Stripe account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our system uses Stripe Connect to safely transfer funds to your account.
              A one-time setup fee of $50 will be charged to configure your account.
            </p>
            <Button 
              onClick={handleConnectOnboarding}
              disabled={isLoading || currentPlan !== 'premium'}
            >
              {isLoading ? 'Processing...' : 'Connect with Stripe'}
            </Button>
            {currentPlan !== 'premium' && (
              <p className="text-xs text-muted-foreground mt-2">
                You need a Premium plan to connect your Stripe account.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
