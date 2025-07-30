import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PRICE_RANGES } from "@/lib/constants";

const leadCaptureSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  budget: z.string().min(1, "Please select your budget range"),
});

type LeadCaptureForm = z.infer<typeof leadCaptureSchema>;

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

export default function LeadCaptureForm({
  title = "Start Your Investment Journey",
  subtitle,
  buttonText = "Get Free Investment Consultation",
  className = ""
}: LeadCaptureFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<LeadCaptureForm>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      budget: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: LeadCaptureForm) => {
      const inquiryData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        budget: data.budget,
        interest: "Investment Consultation",
        message: "Lead capture form submission - interested in real estate investment consultation",
      };

      return apiRequest("POST", "/api/inquiries", inquiryData);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We'll be in touch within 24 hours to discuss your investment goals.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadCaptureForm) => {
    createInquiryMutation.mutate(data);
  };

  return (
    <Card className={`bg-white/95 backdrop-blur-sm ${className}`}>
      <CardContent className="p-8">
        <h3 className="font-dm-serif text-2xl text-rich-black mb-2">{title}</h3>
        {subtitle && (
          <p className="text-slate-blue mb-6">{subtitle}</p>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email Address" {...field} />
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
                  <FormControl>
                    <Input type="tel" placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Investment Budget Range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRICE_RANGES.map((range) => (
                        <SelectItem key={range.label} value={range.label}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={createInquiryMutation.isPending}
              className="w-full bg-orange-gradient text-white py-4 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
            >
              {createInquiryMutation.isPending ? "Submitting..." : buttonText}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
