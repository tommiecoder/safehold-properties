import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";
import { COMPANY_INFO, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-dm-serif text-4xl md:text-5xl text-rich-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-blue max-w-3xl mx-auto">
              Ready to start your real estate investment journey? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-dm-serif text-2xl text-rich-black mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-orange/10 p-3 rounded-lg flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary-orange" />
                      </div>
                      <div>
                        <div className="font-semibold text-rich-black mb-1">Lagos Office</div>
                        <div className="text-slate-blue">{COMPANY_INFO.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-orange/10 p-3 rounded-lg flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary-orange" />
                      </div>
                      <div>
                        <div className="font-semibold text-rich-black mb-1">Phone</div>
                        <div className="text-slate-blue">{COMPANY_INFO.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-orange/10 p-3 rounded-lg flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary-orange" />
                      </div>
                      <div>
                        <div className="font-semibold text-rich-black mb-1">Email</div>
                        <div className="text-slate-blue">{COMPANY_INFO.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-rich-black mb-1">WhatsApp</div>
                        <div className="text-slate-blue">{WHATSAPP_NUMBER}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-orange/10 p-3 rounded-lg flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary-orange" />
                      </div>
                      <div>
                        <div className="font-semibold text-rich-black mb-1">Business Hours</div>
                        <div className="text-slate-blue">
                          <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                          <div>Saturday: 10:00 AM - 4:00 PM</div>
                          <div>Sunday: Closed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="font-dm-serif text-2xl text-rich-black mb-6">Follow Us</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <a
                      href={COMPANY_INFO.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group"
                    >
                      <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-colors">
                        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
                        </svg>
                      </div>
                      <span className="font-medium text-pink-600">Instagram</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
                        </svg>
                      </div>
                      <span className="font-medium text-green-600">WhatsApp</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-dm-serif text-4xl text-rich-black mb-4">Visit Our Office</h2>
            <p className="text-xl text-slate-blue">Located in Peninsula Gardens Estate, Sangotedo, Ajah, Lekki</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2!2d3.62!3d6.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf6e2cdfbe75b%3A0x8cb86ebf7f8b9071!2sSangotedo%2C%20Ajah%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1703123456789"
                  width="100%"
                  height="384"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Safehold Properties Office Location"
                />
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-dm-serif text-xl text-rich-black mb-4">Office Location</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-rich-black">Lagos Office</h4>
                      <p className="text-slate-blue text-sm">{COMPANY_INFO.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-dm-serif text-xl text-rich-black mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
                      </svg>
                      <span>Start WhatsApp Chat</span>
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="w-full bg-orange-gradient text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 hover:shadow-lg"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Email</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-dm-serif text-4xl text-rich-black mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-blue">Quick answers to common questions about our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-rich-black mb-3">What areas do you cover?</h3>
                <p className="text-slate-blue text-sm">
                  We specialize in premium properties across Lagos, Abuja, Abeokuta, Asaba, and beyond for our international clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-rich-black mb-3">What is your minimum investment?</h3>
                <p className="text-slate-blue text-sm">
                  We work with various investment budgets starting from ₦10M, with personalized consultation to match your financial goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-rich-black mb-3">Do you assist with financing?</h3>
                <p className="text-slate-blue text-sm">
                  Yes, we have partnerships with leading financial institutions to help clients secure favorable financing options for their investments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-rich-black mb-3">How long does the purchase process take?</h3>
                <p className="text-slate-blue text-sm">
                  Typically 4-8 weeks from offer acceptance to completion, depending on documentation and due diligence requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dm-serif text-4xl text-white mb-6">
            Ready to Begin Your Investment Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our team today and let's discuss how we can help you achieve your real estate investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-gradient text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-slate-blue transition-all duration-300 font-semibold text-lg inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
