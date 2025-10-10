import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import doctorHero from "@/assets/doctor-hero.png";
import heartIcon from "@/assets/heart-icon.png";
import glucoseIcon from "@/assets/glucose-icon.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Content */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Diabetes Prediction App
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                Empowering you with AI-driven insights for early diabetes detection and better health management.
              </p>
            </div>
            
            <Button 
              variant="navy" 
              size="lg" 
              className="h-14 px-8 text-lg"
              onClick={() => navigate("/detection")}
            >
              Start Diabetes Detection
            </Button>

            {/* Feature Icons */}
            <div className="flex gap-6 pt-8">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <img src={heartIcon} alt="Heart Health" className="w-16 h-16" />
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <img src={glucoseIcon} alt="Glucose Monitoring" className="w-16 h-16" />
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full"></div>
              <img 
                src={doctorHero} 
                alt="Healthcare Professional" 
                className="relative w-full max-w-lg rounded-full shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Early Detection</h3>
            <p className="text-muted-foreground">
              Advanced AI algorithms analyze your health metrics to predict diabetes risk early.
            </p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Expert Consultation</h3>
            <p className="text-muted-foreground">
              Connect with experienced endocrinologists and diabetologists for personalized care.
            </p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Health Tracking</h3>
            <p className="text-muted-foreground">
              Monitor your glucose levels, BMI, and other vital health metrics over time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
