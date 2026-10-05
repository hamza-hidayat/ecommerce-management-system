import { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In the future, this can send an email to the admin via backend
        toast.success("Message sent! We will contact you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg"><Phone className="text-green-600" /></div>
                        <div>
                            <h3 className="font-bold text-lg">Phone & WhatsApp</h3>
                            <p className="text-gray-600">+93 784 823 772</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg"><Mail className="text-blue-600" /></div>
                        <div>
                            <h3 className="font-bold text-lg">Email</h3>
                            <p className="text-gray-600">hamza@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg"><MapPin className="text-purple-600" /></div>
                        <div>
                            <h3 className="font-bold text-lg">Address</h3>
                            <p className="text-gray-600">Kabul, Afghanistan</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="text-blue-600" />
                        <h2 className="text-xl font-bold">Send us a message</h2>
                    </div>
                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" />
                    <input required type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded" />
                    <textarea required rows="5" placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-2 border rounded"></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;