// src/components/TypographyPreview.tsx
import { useLanguage } from '@/lib/LanguageContext';

export const TypographyPreview = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 p-8 border-l-4 border-green-600 my-8">
      <h2 className="text-xl font-bold mb-6 font-display text-gray-700">
        {t('typography.preview.title')}
      </h2>

      {/* 1. Lemon Milk - Titres */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2 font-body">
          {t('typography.display.label')}
        </span>
        <h1 className="font-display text-5xl md:text-6xl text-gray-900 leading-tight mb-4">
          Collectif des Hirondelles
        </h1>
        <p className="text-xl text-gray-700 font-body">
          {t('typography.display.hero')}
        </p>
      </div>

      {/* 2. Outer Sans - Accents */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2 font-body">
          {t('typography.accent.label')}
        </span>
        <h2 className="font-accent text-4xl text-green-800 mb-3">
          {t('typography.accent.title')}
        </h2>
        <p className="text-lg text-gray-600 font-body">
          {t('typography.accent.description')}
        </p>
      </div>

      {/* 3. Agenor Neue - Corps de texte */}
      <div>
        <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2 font-body">
          {t('typography.body.label')}
        </span>
        <p className="text-base text-gray-800 leading-relaxed font-body max-w-2xl">
          {t('typography.body.description')}
        </p>
      </div>
    </div>
  );
};