'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import type { ProductScreenshot } from '@/lib/types';

interface HeroCarouselProps {
  locale: Locale;
  slides: ProductScreenshot[];
}

const AUTOPLAY_MS = 6500;

export default function HeroCarousel({ locale, slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressFilled, setProgressFilled] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    setActiveIndex((current) => Math.min(current, slides.length - 1));
  }, [slides.length]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (slides.length ? (prev + 1) % slides.length : 0));
  }, [slides.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : 0));
  }, [slides.length]);

  useEffect(() => {
    if (paused || reducedMotion || slides.length <= 1) return undefined;
    const id = window.setInterval(showNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, slides.length, showNext]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    setProgressFilled(false);
    const id = requestAnimationFrame(() => setProgressFilled(true));
    return () => cancelAnimationFrame(id);
  }, [activeIndex]);

  const announcement = useMemo(() => {
    if (!slides.length) return '';
    const current = slides[activeIndex];
    const title = t(current.moduleReference?.title, locale) || t(current.title, locale);
    return `Slide ${activeIndex + 1} of ${slides.length}: ${title}`;
  }, [activeIndex, locale, slides]);

  if (!slides.length) return null;

  const current = slides[activeIndex];
  const moduleTitle = t(current.moduleReference?.title, locale) || t(current.title, locale);
  const description = t(current.moduleReference?.businessOverview, locale) || t(current.caption, locale) || '';
  const capabilities = (current.moduleReference?.featureList?.[locale] ?? current.moduleReference?.featureList?.en ?? []).slice(0, 5);
  const altText = t(current.alt, locale) || `${moduleTitle} screenshot`;
  const eyebrow = t(current.moduleLabel, locale) || moduleTitle;

  const functionalSlug = current.moduleReference?.functionalSlug;
  // Configuration is a platform capability, not a functional module — it links to the Platform page instead of a module page.
  const learnMoreHref = functionalSlug ? `/${locale}/modules/${functionalSlug}` : `/${locale}/platform#configuration`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={locale === 'ie' ? 'Cairéal scáileán an táirge' : 'Product screenshot carousel'}
      tabIndex={0}
      className="w-full focus:outline-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') showNext();
        if (event.key === 'ArrowLeft') showPrevious();
        if (event.key === 'Home') setActiveIndex(0);
        if (event.key === 'End') setActiveIndex(slides.length - 1);
      }}
      onPointerDown={(event) => {
        dragStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (dragStartX.current === null) return;
        const delta = event.clientX - dragStartX.current;
        dragStartX.current = null;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) showNext();
        else showPrevious();
      }}
    >
      <span className="sr-only" aria-live="polite">{announcement}</span>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-raised shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface-base px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-border" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-border" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-border" aria-hidden="true" />
          </div>
          <div
            ref={trackRef}
            className={`aspect-[16/10] w-full bg-surface-base ${reducedMotion ? '' : 'transition-opacity duration-500 ease-out'}`}
          >
            <img
              key={current._id}
              src={current.image?.asset?.url || ''}
              alt={altText}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="h-1 w-full bg-surface-border overflow-hidden">
            {!reducedMotion && (
              <div
                className="h-full origin-left bg-primary-600"
                style={{
                  transform: progressFilled ? 'scaleX(1)' : 'scaleX(0)',
                  transition: paused ? 'none' : `transform ${AUTOPLAY_MS}ms linear`,
                }}
              />
            )}
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-muted mb-3">{eyebrow}</p>
          <h3 className="font-serif text-2xl md:text-3xl text-primary-800 leading-tight">{moduleTitle}</h3>
          {description && (
            <p className="mt-4 text-base text-ink-secondary leading-relaxed max-w-prose-tight">{description}</p>
          )}
          {capabilities.length > 0 && (
            <ul className="mt-5 flex flex-col gap-2">
              {capabilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex items-center gap-3">
            <Link
              href={learnMoreHref}
              className="inline-flex items-center px-4 py-2 bg-primary-800 text-ink-inverse text-sm font-medium rounded hover:bg-primary-700 transition-colors duration-200"
            >
              {locale === 'ie' ? 'Foghlaim Tuilleadh' : 'Learn More'}
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPrevious}
                className="rounded border border-surface-border px-3 py-2 text-sm text-ink-secondary hover:border-primary-300 hover:text-primary-700"
                aria-label={locale === 'ie' ? 'Taispeáin an scáileán roimhe seo' : 'Show previous screenshot'}
              >
                ←
              </button>
              <button
                type="button"
                onClick={showNext}
                className="rounded border border-surface-border px-3 py-2 text-sm text-ink-secondary hover:border-primary-300 hover:text-primary-700"
                aria-label={locale === 'ie' ? 'Taispeáin an chéad scáileán eile' : 'Show next screenshot'}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
