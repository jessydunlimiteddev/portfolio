import React from 'react';
import { Github, Linkedin, Twitter, Mail, Briefcase } from 'lucide-react';

export const FloatingSocials: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-12 hidden lg:flex flex-col items-center gap-6 text-secondary z-40">
      <a href="https://github.com/jessydunlimiteddev" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="GitHub Profile" title="GitHub Profile">
        {/* Replace with your GitHub URL */}
        <Github size={20} />
      </a>
      <a href="https://www.linkedin.com/in/jessica-c-adiele-gmcpn-278136264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn Profile" title="LinkedIn Profile">
        {/* Replace with your LinkedIn URL */}
        <Linkedin size={20} />
      </a>
      <a href="mailto:your-email@example.com" className="hover:text-accent hover:-translate-y-1 transition-all duration-300" aria-label="Send Email" title="Send Email">
        {/* Replace with your Email Address */}
        <Mail size={20} />
      </a>
      <div className="w-[1px] h-24 bg-secondary mt-2"></div>
    </div>
  );
};