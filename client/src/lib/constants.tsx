export const LOCATIONS = [
  "Lagos",
  "Abuja", 
  "Abeokuta",
  "Asaba",
  "South Africa"
] as const;

export const PROPERTY_TYPES = [
  "residential",
  "commercial", 
  "land",
  "mixed use"
] as const;

export const PRICE_RANGES = [
  { label: "₦10M - ₦50M", min: 10000000, max: 50000000 },
  { label: "₦50M - ₦100M", min: 50000000, max: 100000000 },
  { label: "₦100M - ₦250M", min: 100000000, max: 250000000 },
  { label: "₦250M+", min: 250000000, max: undefined }
] as const;

export const BEDROOM_OPTIONS = [
  { label: "1-2 Bedrooms", value: 1 },
  { label: "3-4 Bedrooms", value: 3 },
  { label: "5+ Bedrooms", value: 5 }
] as const;

export const BATHROOM_OPTIONS = [
  { label: "1-2 Bathrooms", value: 1 },
  { label: "3-4 Bathrooms", value: 3 },
  { label: "5+ Bathrooms", value: 5 }
] as const;

export const WHATSAPP_NUMBER = "+2347035539944";
export const WHATSAPP_MESSAGE = "Hi, I'm interested in learning more about real estate investment opportunities";

export const COMPANY_INFO = {
  name: "Safehold Properties",
  email: "info@safeholdproperties.com",
  phone: "+2347035539944",
  address: "Plot 123, Victoria Island, Lagos, Nigeria",
  socialMedia: {
    instagram: "https://instagram.com/safeholdproperties",
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`,
    linkedin: "#",
    facebook: "#"
  }
} as const;