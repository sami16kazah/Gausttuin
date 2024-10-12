import { FaPhoneAlt, FaFax, FaEnvelope, FaFacebookF, FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

function ContactCard() {
  return (
    <div className="relative max-w-sm p-8 rounded-lg bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-white shadow-lg overflow-hidden h-full ">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
      <p className="mb-6 text-sm">Have questions? We are just a message away</p>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaPhoneAlt className="text-2xl" />
          <div>
            <p className="font-semibold">PHONE</p>
            <p className="text-sm">00 0002 1234</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FaFax className="text-2xl" />
          <div>
            <p className="font-semibold">FAX</p>
            <p className="text-sm">00 0002 1234</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-2xl" />
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-sm">info@degasshuit.com</p>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-8 flex gap-x-4">
        <FaFacebookF className="text-2xl cursor-pointer" />
        <FaInstagram className="text-2xl cursor-pointer" />
        <FaTwitter className="text-2xl cursor-pointer" />
        <FaWhatsapp className="text-2xl cursor-pointer" />
      </div>

      {/* Orange Gradient Ellipse */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-r from-white to-[#FF914D] rounded-full opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}

export default ContactCard;
