import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const appointmentSchema = z.object({
  patientName: z.string().trim().min(1, "Name is required").max(100),
  patientEmail: z.string().trim().email("Invalid email address").max(255),
  patientPhone: z.string().trim().max(20).optional(),
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
  notes: z.string().trim().max(1000).optional(),
});

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: {
    id: number;
    name: string;
    specialty: string;
  };
}

export const AppointmentDialog = ({ open, onOpenChange, doctor }: AppointmentDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      appointmentSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book an appointment",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      specialty: doctor.specialty,
      appointment_date: formData.appointmentDate,
      appointment_time: formData.appointmentTime,
      patient_name: formData.patientName,
      patient_email: formData.patientEmail,
      patient_phone: formData.patientPhone || null,
      notes: formData.notes || null,
      status: "pending",
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your appointment has been booked successfully.",
      });
      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        appointmentDate: "",
        appointmentTime: "",
        notes: "",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment with {doctor.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Full Name</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientEmail">Email</Label>
            <Input
              id="patientEmail"
              type="email"
              value={formData.patientEmail}
              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientPhone">Phone (Optional)</Label>
            <Input
              id="patientPhone"
              type="tel"
              value={formData.patientPhone}
              onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointmentDate">Preferred Date</Label>
            <Input
              id="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointmentTime">Preferred Time</Label>
            <Input
              id="appointmentTime"
              type="time"
              value={formData.appointmentTime}
              onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any specific concerns or requirements..."
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};