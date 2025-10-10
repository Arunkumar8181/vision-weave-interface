import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Detection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    glucose: "",
    bloodPressure: "",
    bmi: "",
    age: "",
    insulin: "",
    skinThickness: "",
    pregnancies: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.glucose || !formData.bloodPressure || !formData.bmi) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate prediction
    toast.success("Analyzing your health data...");
    
    // Navigate to result page after a brief delay
    setTimeout(() => {
      navigate("/result", { state: { formData } });
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-primary)" }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-soft)]">
            <h1 className="text-3xl font-bold text-card-foreground mb-2">
              Diabetes Detection
            </h1>
            <p className="text-muted-foreground mb-8">
              Enter your health data below for diabetes prediction
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="glucose">Glucose Level</Label>
                <Input
                  id="glucose"
                  type="number"
                  placeholder="Enter glucose level"
                  value={formData.glucose}
                  onChange={(e) => handleInputChange("glucose", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    type="number"
                    placeholder="BP"
                    value={formData.bloodPressure}
                    onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi">BMI</Label>
                  <Input
                    id="bmi"
                    type="number"
                    step="0.1"
                    placeholder="BMI"
                    value={formData.bmi}
                    onChange={(e) => handleInputChange("bmi", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insulin">Insulin Level</Label>
                  <Input
                    id="insulin"
                    type="number"
                    placeholder="Insulin"
                    value={formData.insulin}
                    onChange={(e) => handleInputChange("insulin", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skinThickness">Skin Thickness</Label>
                  <Input
                    id="skinThickness"
                    type="number"
                    placeholder="mm"
                    value={formData.skinThickness}
                    onChange={(e) => handleInputChange("skinThickness", e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pregnancies">No of Pregnancies</Label>
                  <Input
                    id="pregnancies"
                    type="number"
                    placeholder="Count"
                    value={formData.pregnancies}
                    onChange={(e) => handleInputChange("pregnancies", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <Button type="submit" variant="navy" className="w-full h-12 text-base">
                Predict Now
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detection;
