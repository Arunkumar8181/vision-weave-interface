import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import doctorImage from "@/assets/doctor-hero.png";
import { useState } from "react";
import { PatientRegistrationDialog } from "@/components/PatientRegistrationDialog";
import { Badge } from "@/components/ui/badge";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const prediction = location.state?.prediction;
  const [showRegistration, setShowRegistration] = useState(false);

  // Get risk level details
  const riskLevel = prediction?.riskLevel || "medium";
  const confidence = prediction?.confidence || 0;
  const analysis = prediction?.analysis || "Unable to determine risk level";
  const recommendations = prediction?.recommendations || [];
  const keyFactors = prediction?.keyFactors || [];

  const getRiskIcon = () => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "medium":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case "high":
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      default:
        return <AlertCircle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "high":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskTitle = () => {
    switch (riskLevel) {
      case "low":
        return "Low Risk of Diabetes";
      case "medium":
        return "Medium Risk of Diabetes";
      case "high":
        return "High Risk of Diabetes Detected";
      default:
        return "Risk Assessment Unavailable";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div style={{ background: "var(--gradient-primary)" }}>
        <Navigation />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Prediction Result Card */}
          <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-bold text-card-foreground">AI Prediction Result</h1>
              <Button variant="accent" size="sm" onClick={() => setShowRegistration(true)}>
                Register Patient
              </Button>
            </div>

            <div className="space-y-6">
              {/* Risk Level */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${getRiskColor()}`}>
                  {getRiskIcon()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-card-foreground">
                      {getRiskTitle()}
                    </h2>
                    <Badge variant="secondary" className={getRiskColor()}>
                      {confidence}% Confidence
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{analysis}</p>
                </div>
              </div>

              {/* Key Factors */}
              {keyFactors.length > 0 && (
                <div className="bg-muted/30 rounded-xl p-4">
                  <h3 className="font-semibold text-card-foreground mb-3">Key Risk Factors:</h3>
                  <ul className="space-y-2">
                    {keyFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <h3 className="font-semibold text-card-foreground mb-3">Recommendations:</h3>
                  <ul className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button variant="navy" size="lg" onClick={() => navigate("/doctors")} className="flex-1">
                  Consult Doctor Now
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/detection")} className="flex-1">
                  New Prediction
                </Button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">
              ⚠️ This is an AI-powered assessment and should not replace professional medical advice. 
              Please consult with a healthcare provider for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      </main>
      <PatientRegistrationDialog open={showRegistration} onOpenChange={setShowRegistration} />
    </div>
  );
};

export default Result;
