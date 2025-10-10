import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { toast } from "sonner";

const Prescription = () => {
  const handleDownload = () => {
    toast.success("Prescription downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div style={{ background: "var(--gradient-primary)" }}>
        <Navigation />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">Prescription</h1>
            <Button variant="accent" size="sm">
              Prescription
            </Button>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input 
                  id="patientName" 
                  placeholder="Enter patient name" 
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea 
                  id="diagnosis" 
                  placeholder="Enter diagnosis" 
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicines">Prescribed Medicines</Label>
                <Textarea 
                  id="medicines" 
                  placeholder="List prescribed medicines" 
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input 
                  id="dosage" 
                  placeholder="Enter dosage instructions" 
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input 
                    id="duration" 
                    placeholder="e.g., 7 days" 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage-times">Dosage Times</Label>
                  <Input 
                    id="dosage-times" 
                    placeholder="e.g., 3 times/day" 
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature">Signature</Label>
                <div className="relative">
                  <Input 
                    id="signature" 
                    defaultValue="Dr. Anitha Sharma" 
                    className="h-12"
                    readOnly
                  />
                  <FileText className="absolute right-3 top-3 h-6 w-6 text-muted-foreground" />
                </div>
              </div>

              <Button 
                variant="navy" 
                className="w-full h-12 text-base"
                onClick={handleDownload}
              >
                Download Prescription
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Prescription;
