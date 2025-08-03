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
    // Seed properties with real Ajah properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Modern 2 Bedroom Apartment",
        description: "This modern 2-bedroom apartment in Ajah exemplifies contemporary urban living with its sophisticated design and premium finishes. The property features a spacious living area perfect for both relaxation and entertainment, complemented by a fully equipped kitchen that meets the highest standards of modern convenience. Residents enjoy access to exceptional amenities including a fully equipped gym, estate swimming pool, and round-the-clock security services. The apartment's strategic location within a secure estate ensures peace of mind while maintaining excellent connectivity to Lagos's key commercial and recreational areas.",
        price: 80000000,
        location: "Ajah, Lagos",
        propertyType: "residential",
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
        amenities: ["24hrs Light", "24hrs Security", "Estate Pool", "Fully Equipped Gym", "Spacious Living Area", "Modern Kitchen", "Marble Flooring"],
        images: [
          "/attached_assets/IMG-20250803-WA0132_1754260369807.jpg",
          "/attached_assets/IMG-20250803-WA0133_1754260369842.jpg",
          "/attached_assets/IMG-20250803-WA0134_1754260369868.jpg",
          "/attached_assets/IMG-20250803-WA0135_1754260369899.jpg",
          "/attached_assets/IMG-20250803-WA0136_1754260369942.jpg",
          "/attached_assets/IMG-20250803-WA0137_1754260369981.jpg",
          "/attached_assets/IMG-20250803-WA0138_1754260370012.jpg",
          "/attached_assets/IMG-20250803-WA0139_1754260370036.jpg",
          "/attached_assets/IMG-20250803-WA0140_1754260370059.jpg",
          "/attached_assets/IMG-20250803-WA0141_1754260370078.jpg",
          "/attached_assets/IMG-20250803-WA0142_1754260370097.jpg"
        ],
        featured: true,
        available: true,
      },
      {
        title: "Brand New 4 Bedroom Fully Detached Duplex",
        description: "This brand new 4-bedroom fully detached duplex represents the pinnacle of modern luxury living in Ajah, Lagos. The property features a spacious layout with all bedrooms en-suite, a separate boys quarters (BQ), and a well-appointed kitchenette alongside a fully fitted kitchen with premium accessories. The home boasts a comfortable family lounge, quality tiles throughout, and elegant pop ceiling designs that enhance the sophisticated ambiance. Located in a secured and well-developed neighborhood with 24-hour security, this property comes with a Certificate of Occupancy and full building approval, ensuring complete peace of mind for discerning buyers.",
        price: 350000000,
        location: "Ajah, Lagos",
        propertyType: "residential",
        bedrooms: 4,
        bathrooms: 4,
        area: 350,
        amenities: ["BQ (Boys Quarters)", "Kitchenette", "Fitted Kitchen with Accessories", "Family Lounge", "Quality Tiles", "Pop Design", "All Rooms En Suite", "Secured Neighborhood", "24hrs Security", "Certificate of Occupancy", "Building Approval"],
        images: [
          "/attached_assets/IMG_6426_1754261332731.PNG",
          "/attached_assets/IMG_6424_1754261332765.PNG",
          "/attached_assets/IMG_6431_1754261332808.PNG",
          "/attached_assets/IMG_6427_1754261332856.PNG",
          "/attached_assets/IMG_6430_1754261332901.PNG",
          "/attached_assets/IMG_6429_1754261332934.PNG",
          "/attached_assets/IMG_6421_1754261332963.PNG",
          "/attached_assets/IMG_6422_1754261332997.PNG",
          "/attached_assets/IMG_6417_1754261333030.PNG",
          "/attached_assets/IMG_6432_1754261333061.PNG",
          "/attached_assets/IMG_6420_1754261333094.PNG"
        ],
        featured: true,
        available: true,
      }
    ];

    sampleProperties.forEach((property) => {
      this.createProperty(property);
    });

    // Seed team members
    const sampleTeamMembers: InsertTeamMember[] = [
      {
        name: "Adebayo Johnson",
        role: "CEO & Principal Broker",
        bio: "With over 15 years in Nigerian real estate, Adebayo specializes in luxury properties and investment consulting for high-net-worth individuals.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedin: "https://linkedin.com/in/adebayo-johnson",
        twitter: "https://twitter.com/adebayojohnson"
      },
      {
        name: "Fatima Abdullahi",
        role: "Investment Advisor",
        bio: "Fatima helps clients navigate real estate investments across Lagos and Abuja, with expertise in commercial properties and ROI optimization.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b169?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedin: "https://linkedin.com/in/fatima-abdullahi"
      },
      {
        name: "Emmanuel Okafor",
        role: "Property Manager",
        bio: "Emmanuel oversees property management and client relations, ensuring seamless transactions and exceptional customer service.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        linkedin: "https://linkedin.com/in/emmanuel-okafor"
      }
    ];

    sampleTeamMembers.forEach((member) => {
      this.createTeamMember(member);
    });

    // Seed testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Adunni Adebayo",
        role: "Business Owner",
        content: "Safehold Properties helped me find the perfect investment property in Victoria Island. Their expertise and guidance throughout the process was exceptional.",
        rating: 5,
        featured: true,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Chike Okwu",
        role: "Investor",
        content: "The team's knowledge of the Abuja market is unmatched. They helped me secure a commercial property that has already exceeded my ROI expectations.",
        rating: 5,
        featured: true,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Amina Hassan",
        role: "First-time Buyer",
        content: "As a first-time buyer, I was nervous about the process. Safehold Properties made everything simple and helped me find my dream home in Abeokuta.",
        rating: 5,
        featured: true,
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      }
    ];

    sampleTestimonials.forEach((testimonial) => {
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
      id,
      title: insertProperty.title,
      description: insertProperty.description,
      price: insertProperty.price,
      location: insertProperty.location,
      propertyType: insertProperty.propertyType,
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      area: insertProperty.area ?? null,
      amenities: insertProperty.amenities ?? null,
      images: insertProperty.images ?? null,
      featured: insertProperty.featured ?? null,
      available: insertProperty.available ?? null,
      createdAt: new Date(),
    };

    this.properties.set(id, property);
    return property;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      id,
      firstName: insertInquiry.firstName,
      lastName: insertInquiry.lastName ?? null,
      email: insertInquiry.email,
      phone: insertInquiry.phone,
      budget: insertInquiry.budget ?? null,
      interest: insertInquiry.interest ?? null,
      message: insertInquiry.message ?? null,
      propertyId: insertInquiry.propertyId ?? null,
      createdAt: new Date(),
    };

    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = {
      id,
      name: insertMember.name,
      role: insertMember.role,
      image: insertMember.image,
      bio: insertMember.bio ?? null,
      linkedin: insertMember.linkedin ?? null,
      twitter: insertMember.twitter ?? null,
      order: insertMember.order ?? null,
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
      id,
      name: insertTestimonial.name,
      role: insertTestimonial.role,
      content: insertTestimonial.content,
      image: insertTestimonial.image,
      rating: insertTestimonial.rating ?? null,
      featured: insertTestimonial.featured ?? null,
    };

    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();