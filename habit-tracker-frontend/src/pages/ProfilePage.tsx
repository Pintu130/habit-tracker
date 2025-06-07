
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { LogOut, BadgeCheck, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  // Calculate subscription end date
  const subscriptionEnd = user?.subscription?.endDate 
    ? new Date(user.subscription.endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="container max-w-2xl mx-auto p-4 md:p-6 animate-fade-in">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and subscription</p>
        </div>
        
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 text-destructive hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
        
        {/* Subscription Info */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Your current plan and billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <p className="font-medium">
                    {user?.subscription?.type === 'premium' ? 'Premium Plan' : 'Basic Plan'}
                  </p>
                  {user?.subscription?.type === 'premium' && (
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {user?.subscription?.status === 'active'
                    ? 'Active subscription'
                    : user?.subscription?.status === 'trial'
                    ? 'Trial subscription'
                    : 'Inactive subscription'}
                </p>
              </div>
              <Link to="/subscription">
                <Button variant="outline" size="sm">
                  {user?.subscription?.type === 'premium' ? 'Manage' : 'Upgrade'}
                </Button>
              </Link>
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {user?.subscription?.status === 'active' || user?.subscription?.status === 'trial' 
                    ? `Your plan will expire on ${subscriptionEnd}`
                    : 'Your plan is inactive'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
