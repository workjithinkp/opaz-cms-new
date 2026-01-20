import OpportunitiesHero from '@/app/opportunities/components/opportunities-hero'
import OpportunitiesTenders from '@/app/opportunities/components/opportunities-tenders'
import OpportunitiesImpact from '@/app/opportunities/components/opportunities-impact'
import OpportunitiesConnect from '@/app/opportunities/components/opportunities-connect'
import OpportunitiesEcosystem from '@/app/opportunities/components/opportunities-ecosystem'
import OpportunitiesGuidance from '@/app/opportunities/components/opportunities-guidance'

export default function OpportunitiesPage() {
  return (
    <div className="max-w-dvw overflow-hidden">
      <OpportunitiesHero />
      <OpportunitiesTenders />
      <OpportunitiesImpact />
      <OpportunitiesConnect />
      <OpportunitiesEcosystem />
      <OpportunitiesGuidance />
    </div>
  )
}
