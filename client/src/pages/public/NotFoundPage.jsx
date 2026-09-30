import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';

export const NotFoundPage = () => {
  return (
    <div className="w-full max-w-lg mx-auto px-4 py-24 text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-4 shadow-2xl">
        <WebindSymbol className="w-12 h-12 mx-auto text-zinc-500 mb-2" />
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          404 — SYSTEM EXCEPTION
        </span>
        <h1 className="text-3xl font-black text-white uppercase">
          Signal Lost
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
          The requested coordinate or brand within the Webind ecosystem does not exist or has moved.
        </p>
        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ECOSYSTEM</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
