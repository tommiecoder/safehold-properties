import { 
  type Property, 
  type InsertProperty,
  type Inquiry,
  type InsertInquiry,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  searchProperties(filters: {
    propertyType?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;
  private inquiries: Map<string, Inquiry>;
  private teamMembers: Map<string, TeamMember>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.properties = new Map();
    this.inquiries = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Luxury Waterfront Villa",
        description: "Stunning 5-bedroom waterfront villa with private pool and generator. Perfect for high-net-worth individuals seeking premium living in Victoria Island.",
        price: 185000000,
        location: "Victoria Island, Lagos",
        propertyType: "residential",
        bedrooms: 5,
        bathrooms: 6,
        area: 450,
        amenities: ["Swimming Pool", "Generator", "Security", "Parking", "Garden"],
        images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        featured: true,
        available: true,
      },
      {
        title: "Premium Office Complex",
        description: "Modern 12-floor commercial building in Abuja CBD with 24/7 security and ample parking. Ideal for corporate headquarters and investment.",
        price: 450000000,
        location: "Abuja CBD",
        propertyType: "commercial",
        bedrooms: 0,
        bathrooms: 24,
        area: 2500,
        amenities: ["24/7 Security", "Parking", "Elevator", "Generator", "Air Conditioning"],
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        featured: true,
        available: true,
      },
      {
        title: "Gated Estate Development",
        description: "Elegant 4-bedroom homes in a secure gated estate with clubhouse and golf course. Perfect for families seeking luxury and security in Abeokuta.",
        price: 95000000,
        location: "Abeokuta, Ogun",
        propertyType: "residential",
        bedrooms: 4,
        bathrooms: 5,
        area: 320,
        amenities: ["Clubhouse", "Golf Course", "Security", "Playground", "Generator"],
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        featured: true,
        available: true,
      },
      {
        title: "Modern Apartment Complex",
        description: "Contemporary 3-bedroom apartments with city views and modern amenities in the heart of Lagos.",
        price: 75000000,
        location: "Ikeja, Lagos",
        propertyType: "residential",
        bedrooms: 3,
        bathrooms: 4,
        area: 180,
        amenities: ["Gym", "Swimming Pool", "Security", "Parking", "Generator"],
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        featured: false,
        available: true,
      },
      {
        title: "Commercial Land",
        description: "Prime commercial land in Asaba suitable for shopping mall or office complex development.",
        price: 120000000,
        location: "Asaba, Delta",
        propertyType: "land",
        bedrooms: 0,
        bathrooms: 0,
        area: 1000,
        amenities: ["Corner Plot", "Access Road", "Electricity", "Water"],
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        featured: false,
        available: true,
      }
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });

    // Seed team members
    const sampleTeamMembers: InsertTeamMember[] = [
      {
        name: "Olumide Adeyemi",
        role: "Founder & Investment Advisor",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "15+ years of experience in real estate investment and financial advisory",
        linkedin: "#",
        twitter: "#",
        order: 1,
      },
      {
        name: "Funmi Olateju",
        role: "Head of Sales & Client Relations",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "Expert in client relationship management and luxury property sales",
        linkedin: "#",
        twitter: "#",
        order: 2,
      },
      {
        name: "Chidi Nwosu",
        role: "Legal & Documentation Specialist",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "Specialized in real estate law and property documentation",
        linkedin: "#",
        twitter: "#",
        order: 3,
      },
      {
        name: "Aisha Bello",
        role: "Market Research & Analysis",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        bio: "Market analyst with deep insights into Nigerian real estate trends",
        linkedin: "#",
        twitter: "#",
        order: 4,
      }
    ];

    sampleTeamMembers.forEach(member => {
      this.createTeamMember(member);
    });

    // Seed testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Adunni Adebayo",
        role: "CEO, Lagos",
        content: "Safehold Properties helped me acquire three investment properties in Lagos. Their expertise and market knowledge are unmatched. The ROI has exceeded my expectations, and their after-sales service is exceptional.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5,
        featured: true,
      },
      {
        name: "Emeka Okafor",
        role: "Investment Banker",
        content: "As a first-time property investor, I was nervous about making such a significant investment. The team at Safehold made the process seamless and transparent. I'm now a proud owner of a commercial property in Abuja.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5,
        featured: true,
      },
      {
        name: "The Johnsons",
        role: "Diaspora Investors",
        content: "Living in the UK, we needed a trusted partner to help us invest back home. Safehold Properties handled everything from property selection to legal documentation. We now own beautiful properties in both Nigeria and South Africa.",
        image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: 5,
        featured: true,
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.featured);
  }

  async searchProperties(filters: {
    propertyType?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
  }): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => {
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms !== filters.bathrooms) return false;
      return true;
    });
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = {
      ...insertProperty,
      id,
      createdAt: new Date(),
      area: insertProperty.area ?? null,
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      amenities: insertProperty.amenities ?? null,
      images: insertProperty.images ?? null,
      featured: insertProperty.featured ?? null,
      available: insertProperty.available ?? null,
    };
    this.properties.set(id, property);
    return property;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
      lastName: insertInquiry.lastName ?? null,
      budget: insertInquiry.budget ?? null,
      interest: insertInquiry.interest ?? null,
      message: insertInquiry.message ?? null,
      propertyId: insertInquiry.propertyId ?? null,
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = { 
      ...insertMember, 
      id,
      order: insertMember.order ?? null,
      bio: insertMember.bio ?? null,
      linkedin: insertMember.linkedin ?? null,
      twitter: insertMember.twitter ?? null,
    };
    this.teamMembers.set(id, member);
    return member;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.featured);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      rating: insertTestimonial.rating ?? null,
      featured: insertTestimonial.featured ?? null,
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
