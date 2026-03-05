// src/components/OnboardingWrapper.jsx
import { useOnboarding, OnboardingTutorial } from './Onboarding'

export const OnboardingWrapper = ({ children }) => {
  const { show, complete, reset } = useOnboarding()

  return (
    <>
      {children}
      {show && <OnboardingTutorial onClose={complete} />}
    </>
  )
}
