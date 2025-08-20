"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EventRegistrationForm } from "@/components/registration/event-registration-form";
import { ProtectedRoute } from "@/components/protected-route";
import {
  getEventById,
  saveRegistration,
} from "@/lib/actions/participants.actions";
import { useAuth } from "@/lib/auth-context";

export default function EventRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);
  const { user } = useAuth();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(params.id as string);
        setEvent(data);
      } catch (err) {
        console.error(err);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  const handleRegistrationSubmit = async (form: EventRegistrationForm) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      await saveRegistration(event.id, form, user.id);
      setShowRegistrationForm(false);
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {showRegistrationForm && (
          <EventRegistrationForm
            event={event}
            onClose={() => router.back()}
            onSubmit={handleRegistrationSubmit}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
