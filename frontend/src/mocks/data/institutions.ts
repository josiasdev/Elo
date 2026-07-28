import type { Institution } from '@/features/institutions/types/institution'

export const mockInstitutions: Institution[] = [
  {
    id: 'inst-casa-futuro-manaus',
    name: 'Casa Futuro Manaus',
    category: 'ngo',
    description:
      'Organização fictícia dedicada a oficinas de cidadania digital e participação local.',
    city: 'Manaus',
    state: 'AM',
    verificationStatus: 'verified',
    relatedSdgs: [4, 10, 11],
  },
  {
    id: 'inst-rede-jovem-recife',
    name: 'Rede Jovem Recife',
    category: 'collective',
    description:
      'Coletivo fictício que conecta adolescentes a atividades culturais e voluntariado.',
    city: 'Recife',
    state: 'PE',
    verificationStatus: 'verified',
    relatedSdgs: [4, 5, 16],
  },
  {
    id: 'inst-lab-civico-curitiba',
    name: 'Laboratório Cívico Curitiba',
    category: 'socialBusiness',
    description:
      'Iniciativa fictícia voltada a mentorias, dados públicos e inovação comunitária.',
    city: 'Curitiba',
    state: 'PR',
    verificationStatus: 'pending',
    relatedSdgs: [8, 9, 11],
  },
]
