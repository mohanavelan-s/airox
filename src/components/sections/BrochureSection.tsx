/**
 * AIROX 2026 - Official Brochure Section
 * Displays the exact official event brochure with full-screen lightbox and direct download capabilities.
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react';

export const BrochureSection: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  const fallbackSources = [
    '/brochure.png',
    '/assets/airox-2026-official-brochure.png',
    '/images/airox-2026-official-poster.png',
    '/brochures/AIROX-2026-Official-Brochure-preview.png',
    '/brochure.jpg',
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const brochureImageUrl = fallbackSources[currentImgIndex] || '/brochure.png';
  const fallbackImageUrl = '/assets/airox-2026-official-brochure.png';

  const handleImageError = () => {
    if (currentImgIndex < fallbackSources.length - 1) {
      setCurrentImgIndex((prev) => prev + 1);
    }
  };

  // Handle ESC key to exit lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        handleCloseLightbox();
      }
      if (isLightboxOpen) {
        if (e.key === '+' || e.key === '=') {
          handleZoomIn();
        } else if (e.key === '-' || e.key === '_') {
          handleZoomOut();
        } else if (e.key === '0') {
          handleResetZoom();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, zoomLevel]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (isLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
      };
    }
  }, [isLightboxOpen]);

  const handleOpenLightbox = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.4, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.4, 1);
      if (next <= 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Mouse pan handlers when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan and pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y,
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - touchDistance) / 200;
      setZoomLevel((prev) => Math.min(Math.max(prev + delta, 1), 3.5));
      setTouchDistance(dist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
  };

  // Double tap to zoom/toggle on mobile
  const lastTapRef = useRef<number>(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (zoomLevel > 1) {
        handleResetZoom();
      } else {
        setZoomLevel(2);
      }
    }
    lastTapRef.current = now;
  };

  // Direct Download of the original PNG file
  const handleDownloadBrochure = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(brochureImageUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'AIROX-2026-Official-Brochure.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error downloading brochure:', err);
      // Fallback: direct anchor download
      const link = document.createElement('a');
      link.href = brochureImageUrl;
      link.download = 'AIROX-2026-Official-Brochure.png';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }
  };

  // Lightbox element to be rendered in React Portal
  const lightboxModal = (
    <AnimatePresence>
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] w-screen h-[100dvh] bg-[#020612] flex flex-col select-none overflow-hidden"
        >
          {/* Top Toolbar */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-black/90 border-b border-cyan-500/20 z-50 shrink-0 shadow-lg">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-white font-mono font-bold text-xs sm:text-sm tracking-wider truncate">
                AIROX '26 BROCHURE
              </span>
              <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 shrink-0">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={handleZoomIn}
                title="Zoom In (+)"
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-cyan-500 hover:text-black text-white transition-all cursor-pointer active:scale-95"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out (-)"
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-cyan-500 hover:text-black text-white transition-all cursor-pointer active:scale-95"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset Zoom (0)"
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-cyan-500 hover:text-black text-white transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-5 bg-white/20 mx-0.5 sm:mx-1" />

              <button
                onClick={handleDownloadBrochure}
                disabled={isDownloading}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={handleCloseLightbox}
                title="Close (Esc)"
                className="p-1.5 sm:p-2 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 transition-all cursor-pointer ml-1 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas / Image Display Area */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleDoubleTap}
            className={`flex-1 overflow-hidden flex items-center justify-center p-2 sm:p-6 select-none relative bg-[#020612] ${
              zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
          >
            <div
              style={{
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                transition: isDragging || touchDistance !== null ? 'none' : 'transform 0.15s ease-out',
                transformOrigin: 'center center',
              }}
              className="w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={brochureImageUrl}
                alt="AIROX 2026 Official Brochure Full Screen"
                className="max-h-[calc(100dvh-120px)] max-w-[96vw] w-auto h-auto object-contain shadow-2xl rounded-lg"
                draggable={false}
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Bottom Info & Hints Bar */}
          <div className="px-3 sm:px-6 py-2 bg-black/90 border-t border-white/10 text-center text-[10px] sm:text-xs font-mono text-gray-400 shrink-0 flex items-center justify-center gap-2">
            <span className="hidden sm:inline">
              Shortcuts: <kbd className="px-1 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700 text-[10px]">+</kbd> / <kbd className="px-1 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700 text-[10px]">-</kbd> Zoom • Drag to pan • <kbd className="px-1 py-0.5 rounded bg-gray-800 text-gray-200 border border-gray-700 text-[10px]">ESC</kbd> Close
            </span>
            <span className="sm:hidden text-gray-300">
              Pinch or use buttons to Zoom • Drag to Pan • Double-tap to Toggle
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="brochure" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OFFICIAL EVENT POSTER & FLYER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
          >
            AIROX 2026 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">BROCHURE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto"
          >
            Explore the complete official schedule, event guidelines, cash prize laurels, registration fees, and coordinator hotlines.
          </motion.p>

          {/* Top Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6"
          >
            <button
              id="brochure-view-fullscreen-btn"
              onClick={handleOpenLightbox}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer active:scale-95"
            >
              <Maximize2 className="w-4 h-4 text-black" />
              <span>View in Full Screen</span>
            </button>

            <button
              id="brochure-download-btn"
              onClick={handleDownloadBrochure}
              disabled={isDownloading}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Downloaded!</span>
                </>
              ) : isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Brochure</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Brochure Display Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative group max-w-5xl mx-auto rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-gray-900/80 via-black/90 to-gray-950/90 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:border-cyan-400/60 transition-all duration-500"
        >
          {/* Tech Top Accent Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/70 border-b border-white/10 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-cyan-400 font-semibold">AIROX_2026_OFFICIAL_POSTER.IMG</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] hidden sm:flex">
              <span className="flex items-center gap-1 text-gray-300">
                <Calendar className="w-3 h-3 text-cyan-400" /> 22ND AUG 2026
              </span>
              <span className="flex items-center gap-1 text-gray-300">
                <MapPin className="w-3 h-3 text-cyan-400" /> JJCET AUDITORIUM
              </span>
            </div>
          </div>

          {/* Interactive Poster Image Container */}
          <div
            onClick={handleOpenLightbox}
            className="relative cursor-pointer overflow-hidden min-h-[260px] sm:min-h-[420px] aspect-[16/11.3] bg-[#020612] flex items-center justify-center p-2 sm:p-4"
          >
            {!isImgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#020612] z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono text-cyan-300">Loading AIROX 2026 Poster...</span>
                </div>
              </div>
            )}
            <img
              src={brochureImageUrl}
              alt="AIROX 2026 Official Brochure and Event Schedule Flyer"
              onLoad={() => setIsImgLoaded(true)}
              onError={handleImageError}
              className={`w-full h-full object-contain rounded-lg shadow-2xl transition-all duration-700 group-hover:scale-[1.01] ${
                isImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Hover Floating Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/80 border border-cyan-400 text-cyan-300 font-mono font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(6,182,212,0.5)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Click to View in Full Screen</span>
              </div>
            </div>
          </div>

          {/* Frame Bottom Banner */}
          <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Department of AI &amp; DS Release in Association with ISTE</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenLightbox}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
              <span>•</span>
              <button
                onClick={handleDownloadBrochure}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RENDER FULLSCREEN LIGHTBOX DIRECTLY IN DOCUMENT BODY VIA PORTAL */}
      {typeof document !== 'undefined' && createPortal(lightboxModal, document.body)}
    </section>
  );
};

