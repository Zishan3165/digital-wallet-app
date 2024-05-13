import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SignInPage from '../src/app/sign-in/page'
 
describe('Sign in page renders', () => {
  it('renders a h3', () => {
    render(<SignInPage />)
 
    const heading = screen.getByRole('heading', { level: 3 })
 
    expect(heading).toBeInTheDocument()
  }),
  it('renders a button', () => {
    render(<SignInPage />)
 
    const text = screen.getByText('Sign in with MetaMask')
 
    expect(text).toBeInTheDocument()
  })
})