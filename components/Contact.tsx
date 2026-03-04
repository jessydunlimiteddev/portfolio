import React, { useState } from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Mail, Linkedin, Github, Twitter, Send, AlertCircle, CheckCircle, Briefcase } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validate = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required.';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required.';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters.';
        }
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if already touched
    if (touched[name as keyof typeof touched]) {
       setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const nameError = validate('name', formData.name);
    const emailError = validate('email', formData.email);
    const messageError = validate('message', formData.message);
    
    setErrors({
      name: nameError,
      email: emailError,
      message: messageError
    });
    setTouched({
      name: true,
      email: true,
      message: true
    });

    if (!nameError && !emailError && !messageError) {
      // Construct mailto link
      const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Jessy,\n\nI'm contacting you from your portfolio.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open email client
      // Replace with your actual email address
      window.location.href = `mailto:jessicaadiele575@gmail.com?subject=${subject}&body=${body}`;
      
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    }
  };

  const getInputStatusClass = (fieldName: keyof typeof formData) => {
    if (!touched[fieldName]) return 'border-border focus:border-accent';
    if (errors[fieldName]) return 'border-neon-red focus:border-neon-red text-neon-red';
    return 'border-neon-green focus:border-neon-green'; // Valid state
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="max-w-2xl text-center mb-12">
        <p className="font-mono text-accent mb-4">06. What's Next?</p>
        <Reveal width="100%">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
        </Reveal>
        
        <Reveal width="100%">
          <p className="text-secondary text-lg leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </Reveal>
      </div>

      <Reveal width="100%">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6 mb-16 text-left" noValidate>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-mono text-secondary mb-2">Name</label>
            <div className="relative">
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                className={`w-full bg-surfaceHighlight border rounded px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-secondary/50 pr-10 ${getInputStatusClass('name')}`}
                placeholder="Your name"
              />
              <div className="absolute right-3 top-3.5 pointer-events-none">
                {touched.name && errors.name && <AlertCircle size={18} className="text-neon-red animate-pulse" />}
                {touched.name && !errors.name && <CheckCircle size={18} className="text-neon-green" />}
              </div>
            </div>
            {touched.name && errors.name && (
              <p id="name-error" className="text-neon-red text-xs mt-1 font-mono flex items-center gap-1" role="alert">
                <span className="inline-block w-1 h-1 bg-neon-red rounded-full"></span>
                {errors.name}
              </p>
            )}
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-mono text-secondary mb-2">Email</label>
            <div className="relative">
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                className={`w-full bg-surfaceHighlight border rounded px-4 py-3 text-white outline-none transition-colors duration-300 placeholder:text-secondary/50 pr-10 ${getInputStatusClass('email')}`}
                placeholder="your email"
              />
              <div className="absolute right-3 top-3.5 pointer-events-none">
                {touched.email && errors.email && <AlertCircle size={18} className="text-neon-red animate-pulse" />}
                {touched.email && !errors.email && <CheckCircle size={18} className="text-neon-green" />}
              </div>
            </div>
             {touched.email && errors.email && (
              <p id="email-error" className="text-neon-red text-xs mt-1 font-mono flex items-center gap-1" role="alert">
                <span className="inline-block w-1 h-1 bg-neon-red rounded-full"></span>
                {errors.email}
              </p>
            )}
          </div>
          
          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-mono text-secondary mb-2">Message</label>
            <div className="relative">
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                rows={4} 
                className={`w-full bg-surfaceHighlight border rounded px-4 py-3 text-white outline-none transition-colors duration-300 resize-none placeholder:text-secondary/50 pr-10 ${getInputStatusClass('message')}`}
                placeholder="Hello, I'd like to get in touch..."
              />
              <div className="absolute right-3 top-3.5 pointer-events-none">
                 {touched.message && errors.message && <AlertCircle size={18} className="text-neon-red animate-pulse" />}
                 {touched.message && !errors.message && <CheckCircle size={18} className="text-neon-green" />}
              </div>
            </div>
            {touched.message && errors.message && (
              <p id="message-error" className="text-neon-red text-xs mt-1 font-mono flex items-center gap-1" role="alert">
                <span className="inline-block w-1 h-1 bg-neon-red rounded-full"></span>
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-8 py-4 border border-accent text-accent font-mono text-sm hover:bg-accent/10 transition-colors rounded group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Message
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </Reveal>

      <div className="flex justify-center gap-8 text-secondary">
        <a href="https://github.com/jessydunlimiteddev" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="GitHub Profile">
          {/* Replace with your GitHub URL */}
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/jessica-c-adiele-gmcpn-278136264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn Profile">
          {/* Replace with your LinkedIn URL */}
          <Linkedin size={24} />
        </a>
        
        {/* <a href="https://indeed.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="Indeed Profile">
          Replace with your Indeed Profile URL
          <Briefcase size={24} />
        </a> */}
        <a href="mailto:jessicaadiele575@gmail.com" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="Send Email">
           {/* Replace with your Email Address */}
           <Mail size={24} />
        </a>
      </div>
      
      <footer className="mt-24 text-center text-sm font-mono text-secondary/60">
        <p>Designed & Built by Jessy</p>
      </footer>
    </section>
  );
};