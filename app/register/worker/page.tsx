"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Loader2,
  Send,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  workExperience: z.coerce
    .number({ invalid_type_error: "Experience is required" })
    .min(1, "Minimum 1 year experience required"),
  availability: z.string().min(1, "Availability is required"),
});

type WorkerFormValues = z.infer<typeof workerFormSchema>;

const defaultValues: Partial<WorkerFormValues> = {
  fullName: "",
  email: "",
  phone: "",
  workExperience: undefined,
  availability: "",
};

export default function WorkerRegistrationPage() {
  const form = useForm<WorkerFormValues>({
    resolver: zodResolver(workerFormSchema),
    defaultValues,
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
        toast.success("Registration successful!", {
          description: "We'll be in touch soon. Welcome to On Call Network.",
        });
        form.reset(defaultValues);
      } else {
        toast.error("Registration failed", {
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
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link
          href="/#workers"
          className="inline-flex items-center gap-2 text-[#1e3a5f] hover:text-[#d4a853] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-[#d4a853]/20 text-[#d4a853] text-sm font-semibold rounded-full mb-4">
            Join the Team
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">
            Worker Registration
          </h1>
          <p className="text-gray-600">
            Complete the form below to join On Call Network. We&apos;ll review
            your application and get in touch within 7-10 days.
          </p>
        </div>

        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          {...field}
                          placeholder="John Smith"
                          className="pl-11 h-11 border-gray-200 focus:border-[#d4a853] focus:ring-[#d4a853]/20"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="pl-11 h-11 border-gray-200 focus:border-[#d4a853] focus:ring-[#d4a853]/20"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">
                      Phone (Australian mobile) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="04XX XXX XXX"
                          className="pl-11 h-11 border-gray-200 focus:border-[#d4a853] focus:ring-[#d4a853]/20"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">
                      Work Experience (years) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          placeholder="2"
                          className="pl-11 h-11 border-gray-200 focus:border-[#d4a853] focus:ring-[#d4a853]/20"
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? undefined : Number(val));
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1e3a5f]">
                      Availability <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Textarea
                          {...field}
                          placeholder="E.g., Weekday evenings, Weekend mornings, Flexible..."
                          rows={4}
                          className="pl-11 min-h-[100px] border-gray-200 focus:border-[#d4a853] focus:ring-[#d4a853]/20 resize-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
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
                    Submit Registration
                  </>
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Your information is secure and will only be used for recruitment
            purposes.
          </p>
        </div>
      </div>
    </main>
  );
}
