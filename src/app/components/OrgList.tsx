import { Org } from '../interfaces/org'
import Image from 'next/image'

interface Props {
  orgs: Org[]
}

const OrgList = ({ orgs }: Props) => {
  if (orgs.length === 0) return null

  return (
    <section className="mt-6 animate-card-enter">
      <h3
        className="text-lg font-semibold mb-4 px-1"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Organizations
      </h3>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex flex-wrap gap-3">
          {orgs.map(org => (
            <a
              key={org.id}
              href={`https://github.com/${org.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-surface flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 group"
              title={org.description || org.login}
            >
              <Image
                src={org.avatar_url}
                width={28}
                height={28}
                alt={org.login}
                className="rounded-md"
              />
              <span
                className="text-sm font-medium group-hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {org.login}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrgList
