import type { Express } from "express";
import { createServer, type Server } from "http";
import * as nodemailer from "nodemailer";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();


console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS set?', !!process.env.SMTP_PASS);


// Email configuration - Using SMTP service
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send email notification
async function sendFormNotification(inquiryData: any) {
  // Skip email if SMTP credentials are not configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP credentials not configured, skipping email notification");
    console.log("Form submission details:", {
      name: `${inquiryData.firstName} ${inquiryData.lastName}`,
      email: inquiryData.email,
      phone: inquiryData.phone,
      interest: inquiryData.interest,
      budget: inquiryData.budget,
      message: inquiryData.message,
      submittedAt: new Date().toLocaleString(),
    });
    return;
  }

  const mailOptions = {
    from: `"Safehold Properties Website" <${process.env.SMTP_USER}>`,
    to: "tommiemosco224@gmail.com",
    subject: `New Form Submission: ${inquiryData.interest || "General Inquiry"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
          New Form Submission Received
        </h2>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${inquiryData.firstName} ${inquiryData.lastName || ""}</p>
          <p><strong>Email:</strong> <a href="mailto:${inquiryData.email}">${inquiryData.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${inquiryData.phone}">${inquiryData.phone}</a></p>
          <p><strong>Interest:</strong> ${inquiryData.interest || "Not specified"}</p>
          ${inquiryData.budget ? `<p><strong>Budget:</strong> ${inquiryData.budget}</p>` : ""}
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <div style="background: white; padding: 15px; border-left: 4px solid #f39c12; margin: 10px 0;">
            ${inquiryData.message || "No message provided"}
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          <small>Submitted on: ${new Date().toLocaleString()}</small><br>
          <small>From: Safehold Properties Website</small>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      "Email notification sent successfully to safeholdproperties@gmail.com",
    );
  } catch (error) {
    console.error("Failed to send email notification:", error);
    // Log the form data so it's not lost
    console.log("Form submission details (email failed):", {
      name: `${inquiryData.firstName} ${inquiryData.lastName}`,
      email: inquiryData.email,
      phone: inquiryData.phone,
      interest: inquiryData.interest,
      budget: inquiryData.budget,
      message: inquiryData.message,
      submittedAt: new Date().toLocaleString(),
    });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured properties" });
    }
  });

  app.get("/api/properties/search", async (req, res) => {
    try {
      const filters = {
        propertyType: req.query.propertyType as string,
        location: req.query.location as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        bedrooms: req.query.bedrooms ? Number(req.query.bedrooms) : undefined,
        bathrooms: req.query.bathrooms
          ? Number(req.query.bathrooms)
          : undefined,
      };

      const properties = await storage.searchProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to search properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Inquiries endpoint
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      // Call the email notification function after creating inquiry
      sendFormNotification(inquiry).catch(console.error);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: "Invalid inquiry data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });

  // Team members endpoint
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // Testimonials endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/featured", async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured testimonials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
