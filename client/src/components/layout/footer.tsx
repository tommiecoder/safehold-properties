import { Link } from "wouter";
import { COMPANY_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="/images/safehold-new-logo.png" 
              alt="Safehold Properties" 
              className="h-16 w-auto object-contain mb-4 max-w-none"
              onError={(e) => {
                console.log('Footer logo failed to load, using fallback');
                e.currentTarget.src = '/images/safehold-logo.png';
              }}
            />
            <p className="text-white/80 mb-6 leading-relaxed">
              Your trusted partner for premium real estate investments across Nigeria and beyond.
            </p>
            <div className="flex space-x-4">
              <a
                href={COMPANY_INFO.socialMedia.instagram}
                className="text-white/60 hover:text-primary-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socialMedia.whatsapp}
                className="text-white/60 hover:text-primary-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-dm-serif text-xl mb-4">Services</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/properties" className="hover:text-primary-orange transition-colors">Property Investment</Link></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Portfolio Management</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Market Analysis</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Legal Services</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Property Management</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-dm-serif text-xl mb-4">Locations</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-primary-orange transition-colors">Lagos Properties</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Abuja Listings</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Abeokuta Investments</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">Asaba Properties</a></li>
              <li><a href="#" className="hover:text-primary-orange transition-colors">International</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-dm-serif text-xl mb-4">Contact</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Peninsula Gardens Estate, Sangotedo, Ajah, Lekki</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">
              © 2024 Safehold Properties. All rights reserved.
            </p>
            <div className="flex space-x-6 text-white/60">
              <a href="#" className="hover:text-primary-orange transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-orange transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-orange transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}