import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const Doctors = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<{ id: number; name: string; specialty: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const doctors = [
    {
      id: 1,
      name: "Dr. Anitha Sharma",
      specialty: "Endocrinologist",
      location: "Prasemi - Iinon",
      experience: "15+ years",
    },
    {
      id: 2,
      name: "Dr. Manoj Kumar",
      specialty: "Endocrinologist",
      location: "Prasemi - Iinon",
      experience: "12+ years",
    },
    {
      id: 3,
      name: "Dr. Priya Singh",
      specialty: "Diabetologist",
      location: "Prasemi - Iinon",
      experience: "10+ years",
    },
    {
      id: 4,
      name: "Dr. Rajesh Verma",
      specialty: "Endocrinologist",
      location: "Prasemi - Iinon",
      experience: "18+ years",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div style={{ background: "var(--gradient-primary)" }}>
        <Navigation />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Doctors</h1>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Prasemi - Iinon
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <UserRound className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-card-foreground mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {doctor.specialty}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>📍 {doctor.location}</p>
                      <p>⏱️ {doctor.experience}</p>
                    </div>
                    <Button 
                      variant="navy" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={() => {
                        if (!user) {
                          navigate("/auth");
                        } else {
                          setSelectedDoctor({ id: doctor.id, name: doctor.name, specialty: doctor.specialty });
                          setDialogOpen(true);
                        }
                      }}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {selectedDoctor && (
        <AppointmentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default Doctors;
