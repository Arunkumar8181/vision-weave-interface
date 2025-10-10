import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import doctorImage from "@/assets/doctor-hero.png";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  // Simple risk calculation based on glucose level
  const glucoseLevel = parseFloat(formData?.glucose || "0");
  const isHighRisk = glucoseLevel > 140;

  return (
    <div className="min-h-screen bg-background">
      <div style={{ background: "var(--gradient-primary)" }}>
        <Navigation />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Prediction Result Card */}
          <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-bold text-card-foreground">Prediction Result</h1>
              <Button variant="accent" size="sm">
                Register Patient
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-destructive/10 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-card-foreground">
                      {isHighRisk ? "High risk of diabetes detected" : "Low risk of diabetes"}
                    </h2>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {isHighRisk 
                    ? "Please consult a doctor for proper diagnosis and treatment."
                    : "Your health metrics look normal. Continue healthy lifestyle habits."}
                </p>
                <Button variant="navy" size="lg" onClick={() => navigate("/doctors")}>
                  Consult Doctor Now
                </Button>
              </div>
              
              <div className="hidden md:block">
                <img 
                  src={doctorImage} 
                  alt="Doctor" 
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/detection")}
              className="flex-1"
            >
              New Prediction
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/prescription")}
              className="flex-1"
            >
              View Prescription
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
