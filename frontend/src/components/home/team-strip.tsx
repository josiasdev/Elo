// import { Avatar } from '@/components/ui/avatar'
import { Container } from '@/components/ui/container'
import { homeContent } from '@/content/home-content'

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 8.1h4.2V23H.4V8.1Zm7.3 0h4v2h.1c.56-1.06 1.94-2.18 4-2.18 4.28 0 5.07 2.82 5.07 6.48V23h-4.2v-7.64c0-1.82-.03-4.16-2.53-4.16-2.54 0-2.93 1.98-2.93 4.03V23h-4.2V8.1Z" />
    </svg>
  )
}

export function TeamStrip() {
  const { team } = homeContent
  // const avatarVariants: Array<'blue' | 'yellow' | 'pink'> = ['blue', 'yellow', 'pink']

  return (
    <section className="py-14 lg:py-16 bg-elociv-ivory">
      <Container>
        <div className="rounded-3xl border border-elociv-navy/15 bg-background p-6 md:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            <div className="lg:col-span-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-elociv-navy">
                {team.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {team.description}
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {team.members.map((member) => (
                <a
                  key={member.name}
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-elociv-navy/12 bg-elociv-ivory p-4 transition-colors hover:border-elociv-navy/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={`Abrir LinkedIn de ${member.name} em nova aba`}
                >
                  {/* <Avatar
                    initials={member.initials}
                    alt={member.name}
                    size="md"
                    variant={avatarVariants[idx % avatarVariants.length]}
                  /> */}
                  <div className="min-w-0">
                    <h3 className="text-base font-heading font-bold text-elociv-navy leading-tight">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-elociv-plum">
                      {member.role}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 text-elociv-plum">
                    <LinkedinIcon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
