
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropertyUploadForm from "@/components/property-upload-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Plus, BarChart3, Users } from "lucide-react";
import type { Property, InsertProperty, Inquiry } from "@shared/schema";

export default function Admin() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("upload");

  // Fetch properties
  const { data: properties } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Fetch inquiries
  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  // Upload property mutation
  const uploadProperty = useMutation({
    mutationFn: async (property: InsertProperty) => {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      if (!response.ok) throw new Error("Failed to upload property");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      alert("Property uploaded successfully!");
    },
  });

  const stats = [
    {
      title: "Total Properties",
      value: properties?.length || 0,
      icon: Building,
      color: "text-blue-600",
    },
    {
      title: "Featured Properties", 
      value: properties?.filter(p => p.featured).length || 0,
      icon: Plus,
      color: "text-green-600",
    },
    {
      title: "Total Inquiries",
      value: inquiries?.length || 0,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Available Properties",
      value: properties?.filter(p => p.available).length || 0,
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-dm-serif text-4xl text-rich-black mb-2">
            Property Management Dashboard
          </h1>
          <p className="text-slate-blue">
            Manage your property listings and track inquiries
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-blue mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-rich-black">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Property</TabsTrigger>
            <TabsTrigger value="properties">Manage Properties</TabsTrigger>
            <TabsTrigger value="inquiries">View Inquiries</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-6">
            <PropertyUploadForm
              onSubmit={uploadProperty.mutateAsync}
              isLoading={uploadProperty.isPending}
            />
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties?.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-rich-black">
                          {property.title}
                        </h3>
                        <p className="text-sm text-slate-blue">
                          {property.location} • ₦{property.price.toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {property.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                          {property.available && (
                            <Badge variant="secondary">Available</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries?.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-rich-black">
                          {inquiry.firstName} {inquiry.lastName}
                        </h3>
                        <span className="text-sm text-slate-blue">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-blue mb-2">
                        {inquiry.email} • {inquiry.phone}
                      </p>
                      {inquiry.budget && (
                        <p className="text-sm mb-2">
                          <strong>Budget:</strong> {inquiry.budget}
                        </p>
                      )}
                      {inquiry.interest && (
                        <p className="text-sm mb-2">
                          <strong>Interest:</strong> {inquiry.interest}
                        </p>
                      )}
                      {inquiry.message && (
                        <p className="text-sm">
                          <strong>Message:</strong> {inquiry.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
