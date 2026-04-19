"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  User, Mail, Phone, Briefcase, Calendar,
  Loader2, Send, ArrowLeft, MapPin, Shield, ChefHat,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

const workerFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  role: z.string().min(1, "Please select your main role"),
  workExperience: z.coerce
    .number({ invalid_type_error: "Experience is required" })
    .min(1, "Minimum 1 year experience required"),
  hasRSA: z.string().min(1, "Please select RSA status"),
  suburb: z.string().min(1, "Suburb is required"),
  availability: z.string().min(1, "Availability is required"),
  additionalNotes: z.string().optional(),
});

type WorkerFormValues = z.infer<typeof workerFormSchema>;

const ROLES = [
  "Bartender",
  "Waiter / Waitress",
  "Barista",
  "Kitchen Hand",
  "Chef — Commis",
  "Chef — Chef de Partie",
  "Chef — Sous Chef",
  "Head Chef",
  "Floor Manager",
  "Venue Manager",
  "Other",
];

export default function WorkerRegistrationPage() {
  const form = useForm<WorkerFormValues>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "",
      workExperience: undefined,
      hasRSA: "",
      suburb: "",
      availability: "",
      additionalNotes: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: WorkerFormValues) {
    try {
      const response = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (result.success) {
        toast.success("Application submitted!", {
          description: "Diego will review your profile and be in touch within 48 hours.",
        });
        form.reset();
      } else {
        toast.error("Submission failed", {
          description: result.message ?? "Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-12 md:py-16 pb-28 md:pb-16">
        <Link
          href="/#workers"
          className="inline-flex items-center gap-2 text-[#1e3a5f] hover:text-[#d4a853] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
            Join the Network
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">
            Apply to Join OCN
          </h1>
          <p className="text-gray-600 mb-4">
            Only the top 8% of applicants are accepted. We review every application personally and get in touch within 48 hours.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            2-minute mobile form. Fields marked * are required.
          </p>
          <div className="flex items-center gap-2 p-3 bg-[#1e3a5f]/5 rounded-lg">
            <Shield className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
            <p className="text-sm text-[#1e3a5f]">
              Every accepted candidate receives a <strong>Reliability Score</strong> — your verified credential with Sydney venues.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <Form {...form}>
            <form id="worker-application-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">Full Name *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input {...field} autoComplete="name" placeholder="John Smith" className="pl-11 h-11 border-gray-200 focus:border-[#d4a853]" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1e3a5f]">Email *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input {...field} type="email" autoComplete="email" placeholder="john@example.com" className="pl-11 h-11 border-gray-200 focus:border-[#d4a853]" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1e3a5f]">Phone *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input {...field} type="tel" inputMode="tel" autoComplete="tel" placeholder="04XX XXX XXX" className="pl-11 h-11 border-gray-200 focus:border-[#d4a853]" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">Main Role *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ChefHat className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          {...field}
                          className="w-full pl-11 pr-4 h-11 rounded-md border border-gray-200 bg-white text-gray-900 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none text-sm"
                        >
                          <option value="">Select your main role</option>
                          {ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experience + RSA */}
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="workExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1e3a5f]">Years Experience *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            {...field}
                            type="number"
                            inputMode="numeric"
                            min={1}
                            placeholder="2"
                            className="pl-11 h-11 border-gray-200 focus:border-[#d4a853]"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              field.onChange(val === "" ? undefined : Number(val));
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasRSA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1e3a5f]">RSA Certificate *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            {...field}
                            className="w-full pl-11 pr-4 h-11 rounded-md border border-gray-200 bg-white text-gray-900 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none text-sm"
                          >
                            <option value="">Select</option>
                            <option value="Yes — NSW RSA">Yes — NSW RSA</option>
                            <option value="Yes — Interstate RSA">Yes — Interstate RSA</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Suburb */}
              <FormField
                control={form.control}
                name="suburb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">Your Suburb *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input {...field} autoComplete="address-level2" placeholder="E.g., Newtown, Glebe, Surry Hills" className="pl-11 h-11 border-gray-200 focus:border-[#d4a853]" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Availability */}
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">Availability *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Textarea
                          {...field}
                          placeholder="E.g., Friday–Sunday evenings, weekday lunch shifts, flexible..."
                          rows={3}
                          className="pl-11 border-gray-200 focus:border-[#d4a853] resize-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Notes */}
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">Anything else? (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="E.g., I specialize in cocktail bars, I have my own transport, barista training..."
                        rows={2}
                        className="border-gray-200 focus:border-[#d4a853] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white font-bold text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Apply to Join OCN
                  </>
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-gray-400 text-sm mt-6">
            We review every application personally. Only the top 8% are accepted.
          </p>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-20 p-3 bg-[#faf9f6]/95 backdrop-blur border-t border-gray-200">
        <Button
          type="submit"
          form="worker-application-form"
          disabled={isSubmitting}
          className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white font-bold text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Apply to Join OCN
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
