import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Label } from "@/components/ui/label";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interest: z.string().min(1, "Please select your interest"),
  message: z.string().min(10, "Please provide more details about your requirements"),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    createInquiryMutation.mutate(data);
  };

  return (
    <Card>
      <CardContent className="p-8">
        <h3 className="font-dm-serif text-2xl text-rich-black mb-6">Send us a Message</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="firstName" className="text-sm sm:text-base">First Name</Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className="mt-1 text-sm sm:text-base py-2 sm:py-3"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm sm:text-base">Last Name</Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className="mt-1 text-sm sm:text-base py-2 sm:py-3"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="mt-1 text-sm sm:text-base py-2 sm:py-3"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  className="mt-1 text-sm sm:text-base py-2 sm:py-3"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="I'm interested in..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Buying a Property">Buying a Property</SelectItem>
                      <SelectItem value="Investment Consultation">Investment Consultation</SelectItem>
                      <SelectItem value="Property Management">Property Management</SelectItem>
                      <SelectItem value="Partnership Opportunities">Partnership Opportunities</SelectItem>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your investment goals and preferences"
                      rows={4}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={createInquiryMutation.isPending}
              className="w-full bg-orange-gradient text-white py-4 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
            >
              {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}