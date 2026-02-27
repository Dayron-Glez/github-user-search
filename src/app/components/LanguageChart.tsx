import { LanguageStat } from '../lib/github'
import { getLanguageColor } from '../lib/language-colors'

interface Props {
  languages: LanguageStat[]
}

const LanguageChart = ({ languages }: Props) => {
  if (languages.length === 0) return null

  return (
    <div className="glass-card rounded-2xl p-5">
      <h4
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Most Used Languages
      </h4>

      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-4 gap-0.5">
        {languages.map(lang => (
          <div
            key={lang.language}
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: getLanguageColor(lang.language),
              minWidth: '4px',
            }}
            title={`${lang.language}: ${lang.percentage}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {languages.map(lang => (
          <div key={lang.language} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: getLanguageColor(lang.language) }}
            />
            <span
              className="text-xs"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {lang.language}
            </span>
            <span
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguageChart
