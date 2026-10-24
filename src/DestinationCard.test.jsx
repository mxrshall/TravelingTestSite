import { render, screen } from '@testing-library/react'
import DestinationCard from './DestinationCard.jsx'

const kyoto = { name: 'Kyoto', country: 'Japan', blurb: 'Temples and gardens.' }

describe('DestinationCard', () => {
  it('shows a gradient placeholder while no image is set', () => {
    render(<DestinationCard {...kyoto} image="" />)
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('shows the photo once an image path is set', () => {
    render(<DestinationCard {...kyoto} image="/images/kyoto.jpg" />)
    expect(screen.getByRole('img', { name: 'Kyoto, Japan' })).toHaveAttribute('src', '/images/kyoto.jpg')
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument()
  })
})
