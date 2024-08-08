import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CharacterCard from '@/components/CharacterCard'

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

// Mock the CharacterDetails component
jest.mock('@/components/CharacterDetails', () => {
  return function MockCharacterDetails() {
    return <div data-testid="character-details">Character Details</div>
  }
})

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  }

  it('renders character name', () => {
    render(<CharacterCard {...mockCharacter} />)
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  })

  it('renders an image', () => {
    render(<CharacterCard {...mockCharacter} />)
    const image = screen.getByTestId('character-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringMatching(/^\/(?:darkside|jedi)\.png$/)
    )
  })

  it('renders CharacterDetails component', () => {
    render(<CharacterCard {...mockCharacter} />)
    expect(screen.getByTestId('character-details')).toBeInTheDocument()
  })
})
