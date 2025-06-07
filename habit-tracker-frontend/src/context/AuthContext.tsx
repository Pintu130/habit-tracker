
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll allow any valid email/password
      // In a real app, this would validate against a backend
      if (email && password.length > 3) {
        const userData: User = {
          id: "user-1",
          name: email.split("@")[0],
          email,
          subscription: {
            status: "active",
            type: "basic",
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }
        };
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create a new user
      if (name && email && password.length > 3) {
        const userData: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          subscription: {
            status: "trial",
            type: "basic",
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          }
        };
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast({
          title: "Registration successful",
          description: "Welcome to Habit Tracker!",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Please fill out all fields");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
