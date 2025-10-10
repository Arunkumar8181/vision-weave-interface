import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Charbot", path: "/detection" },
    { name: "AI Chat", path: "/chat" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <Activity className="h-6 w-6" />
          <span className="text-xl font-semibold">Diabetes App</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary-foreground ${
                location.pathname === item.path
                  ? "text-primary-foreground"
                  : "text-primary-foreground/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="accent" size="default">
            Register Patient
          </Button>
        </div>
      </div>
    </nav>
  );
};
