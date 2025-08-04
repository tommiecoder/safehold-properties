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
      },
      {
        title: "Luxury 5 Bedroom Fully Detached Duplex with Swimming Pool",
        description: "This exceptional 5-bedroom fully detached duplex sets a new standard for luxury living in Ajah, Lagos. The property features an impressive swimming pool as its centerpiece, complemented by a separate boys quarters and an elegant mini sit-out lounge perfect for outdoor entertaining. The home showcases sophisticated architectural details including high ceilings that create an airy, spacious atmosphere throughout the expansive living areas. The fully fitted kitchen represents the pinnacle of modern culinary design, while the master bathroom features both a luxurious jacuzzi and premium shower cubicle with elegant finishes. Located within a secured and serene estate environment, residents enjoy the peace of mind that comes with 24/7 security services and an interlocked compound that enhances the property's impressive curb appeal. The home also features a charming gazebo and security doors throughout, all backed by Governor's Consent for complete legal assurance.",
        price: 300000000,
        location: "Ajah, Lagos",
        propertyType: "residential",
        bedrooms: 5,
        bathrooms: 5,
        area: 450,
        amenities: ["Swimming Pool", "Boys Quarters (BQ)", "Mini Sit-out Lounge", "High Ceilings", "Spacious Living Room", "Fully Fitted Kitchen", "Shower Cubicle", "Jacuzzi", "Secured Estate", "Interlocked Compound", "Security Doors", "24/7 Security", "Gazebo", "Governor's Consent"],
        images: [
          "/attached_assets/Ins_-1753285374_1754263592289.jpg",
          "/attached_assets/Ins_-1553453108_1754263592335.jpg",
          "/attached_assets/Ins_-1603066340_1754263592399.jpg",
          "/attached_assets/Ins_-489947373_1754263592439.jpg",
          "/attached_assets/Ins_1699827364_1754263592476.jpg",
          "/attached_assets/Ins_-216038209_1754263592523.jpg",
          "/attached_assets/Ins_783095896_1754263592560.jpg",
          "/attached_assets/Ins_1491735393_1754263592627.jpg",
          "/attached_assets/Ins_-1953440599_1754263592670.jpg",
          "/attached_assets/Ins_-1849897572_1754263592707.jpg"
        ],
        featured: true,
        available: true,
      },
      {
        title: "Brand New 5 Bedroom Duplex with BQ",
        description: "This brand new 5-bedroom duplex represents exceptional value for discerning buyers seeking quality and security in Ajah, Lagos. The property features a separate boys quarters (BQ) and is strategically located within a secured and serene estate environment. The home showcases contemporary design elements including an interlocked compound that adds to its aesthetic appeal and functionality. Inside, residents will appreciate the spacious living room designed for both comfort and entertainment, complemented by a fully fitted kitchen that meets modern culinary standards. The property prioritizes security with quality security doors throughout, comprehensive CCTV surveillance system, and round-the-clock security services. The elegant shower cubicles in each bathroom reflect attention to detail in the finishing, making this an ideal investment for families who value both luxury and peace of mind.",
        price: 150000000,
        location: "Ajah, Lagos",
        propertyType: "residential",
        bedrooms: 5,
        bathrooms: 5,
        area: 400,
        amenities: ["Boys Quarters (BQ)", "Secured Estate", "Interlocked Compound", "Quality Security Doors", "Spacious Living Room", "Fully Fitted Kitchen", "Shower Cubicle", "CCTV Surveillance", "24/7 Security", "Serene Environment"],
        images: [
          "/attached_assets/Ins_567187529_1754263896115.jpg",
          "/attached_assets/Ins_632250176_1754263896154.jpg",
          "/attached_assets/Ins_-1975041749_1754263896240.jpg",
          "/attached_assets/Ins_-853349694_1754263896277.jpg",
          "/attached_assets/Ins_-777436344_1754263896312.jpg",
          "/attached_assets/Ins_-75615158_1754263896343.jpg",
          "/attached_assets/Ins_506229433_1754263896365.jpg",
          "/attached_assets/Ins_-544561270_1754263896388.jpg",
          "/attached_assets/Ins_89917146_1754263896409.jpg",
          "/attached_assets/Ins_-2034698163_1754263896430.jpg"
        ],
        featured: true,
        available: true,
      },
      {
        title: "5-Bedroom Fully Detached Duplex with Swimming Pool and BQ",
        description: "This magnificent 5-bedroom fully detached duplex epitomizes luxury living in the heart of Ajah, Lagos, offering an unparalleled blend of sophistication and comfort. The property showcases contemporary architectural excellence with high ceilings that create an airy, grand atmosphere throughout the home. The spacious living areas feature premium marble flooring and designer ceiling lighting that adds elegance to every room. The fully fitted kitchen is a culinary masterpiece, equipped with high-end appliances and sophisticated cabinetry that meets the demands of modern living. Each bathroom is meticulously designed with luxury shower cubicles and elegant fixtures, while the master suite includes an indulgent jacuzzi for ultimate relaxation. The property's crown jewel is the private swimming pool, perfect for recreation and entertainment in a secure, serene estate environment. Additional features include a separate boys quarters (BQ), interlocked compound, quality security doors throughout, and comprehensive 24/7 security services. With Governor's Consent title, this brand new property represents the pinnacle of luxury real estate investment in Lagos.",
        price: 250000000,
        location: "Ajah, Lagos",
        propertyType: "residential",
        bedrooms: 5,
        bathrooms: 6,
        area: 450,
        amenities: ["Swimming Pool", "Boys Quarters (BQ)", "Jacuzzi", "High Ceilings", "Secured Estate", "Interlocked Compound", "Quality Security Doors", "Spacious Living Room", "Fully Fitted Kitchen", "Luxury Shower Cubicles", "Premium Marble Flooring", "Designer Lighting", "24/7 Security", "Governor's Consent", "Brand New"],
        images: [
          "/attached_assets/Ins_339539748_1754264778875.jpg",
          "/attached_assets/Ins_-184875599_1754264778940.jpg",
          "/attached_assets/Ins_-1624821661_1754264779004.jpg",
          "/attached_assets/Ins_1286240231_1754264779034.jpg",
          "/attached_assets/Ins_663738465_1754264779053.jpg",
          "/attached_assets/Ins_1199046213_1754264779071.jpg",
          "/attached_assets/Ins_371453145_1754264779089.jpg",
          "/attached_assets/Ins_-1378599457_1754264779106.jpg",
          "/attached_assets/Ins_929662816_1754264779124.jpg",
          "/attached_assets/Ins_-1890585935_1754264779142.jpg"
        ],
        featured: true,
        available: true,
      },
      {
        title: "4-Bedroom Detached Duplex with BQ",
        description: "This brand new 4-bedroom detached duplex in Sangotedo, Lagos, represents exceptional value for modern families seeking contemporary luxury at an accessible price point. The property features sophisticated architectural design with premium finishes throughout, including elegant marble flooring that flows seamlessly across all living spaces. The fully fitted kitchen showcases high-end cabinetry with beautiful granite countertops and modern appliances, making it a culinary enthusiast's dream. Each of the four bedrooms includes en suite bathrooms with luxury shower cubicles and modern fixtures, while the master suite features an indulgent jacuzzi for ultimate relaxation. The spacious living room is enhanced by designer ceiling lighting that creates a warm, inviting atmosphere perfect for both daily living and entertaining guests. Additional amenities include a separate boys quarters (BQ), interlocked compound for easy maintenance, quality security doors throughout, and comprehensive 24/7 security services. Located within a secured and serene estate with excellent road network connectivity, this property offers the perfect combination of luxury, convenience, and security for discerning homeowners.",
        price: 125000000,
        location: "Sangotedo, Lagos",
        propertyType: "residential",
        bedrooms: 4,
        bathrooms: 5,
        area: 380,
        amenities: ["Boys Quarters (BQ)", "En Suite Rooms", "Jacuzzi", "Secured Estate", "Interlocked Compound", "Quality Security Doors", "Spacious Living Room", "Fully Fitted Kitchen", "Luxury Shower Cubicles", "Premium Marble Flooring", "Designer Lighting", "24/7 Security", "Good Road Network", "Brand New"],
        images: [
          "/attached_assets/Ins_-157785754_1754265201582.jpg",
          "/attached_assets/Ins_997898345_1754265201614.jpg",
          "/attached_assets/Ins_282324999_1754265201644.jpg",
          "/attached_assets/Ins_-273643403_1754265201690.jpg",
          "/attached_assets/Ins_-63581808_1754265201720.jpg",
          "/attached_assets/Ins_-391914668_1754265201750.jpg",
          "/attached_assets/Ins_638626558_1754265201778.jpg",
          "/attached_assets/Ins_924408554_1754265201800.jpg",
          "/attached_assets/Ins_-1207815637_1754265201820.jpg",
          "/attached_assets/Ins_-2012339747_1754265201840.jpg"
        ],
        featured: false,
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
        name: "Satisfied Client",
        role: "Property Investor",
        content: "/attached_assets/IMG_8880.mp4",
        rating: 5,
        featured: true,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Happy Customer",
        role: "Real Estate Client",  
        content: "/attached_assets/IMG_8811.mp4",
        rating: 5,
        featured: true,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
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