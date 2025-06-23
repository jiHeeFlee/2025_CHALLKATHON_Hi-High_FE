'use client'

import { useEffect, useState } from 'react'
import InputStep from '@/app/input/components/InputStep'
import { INPUT_STEPS } from '@/constants/auth'
import { useRouter } from 'next/navigation'
import instance from '@/auth/axios'

export default function InputFlowPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [username, setUsername] = useState('승민') 
  const router = useRouter()
  const [interests, setInterests] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])
  const [desiredOccupation, setDesiredOccupation] = useState<string[]>([])


  const handleNext = async (stepKeywords: string[]) => {
  if (currentStep === 0) {
    setInterests(stepKeywords)
    setCurrentStep(1)
  } else if (currentStep === 1) {
    setGoals(stepKeywords)
    setCurrentStep(2)
  } else if (currentStep === 2) {
    setDesiredOccupation(stepKeywords)

    try {
      await instance.post('/api/auth/update-info', {
        interests: stepKeywords.join(', '),
        goals: goals.join(', '),
        desiredOccupation: desiredOccupation.join(', '),
      })
      router.push('/home') 
    } catch (e) {
      console.error('실패:', e)
    }
  }
}

  const step = INPUT_STEPS[currentStep]

  return (
    <InputStep
      title={`${username}님의`}
      highlight={step.highlight}
      subtitle={step.subtitle}
      placeholder={step.placeholder}
      currentStep={currentStep + 1}
      totalStep={INPUT_STEPS.length}
      onNext={handleNext}
    />
  )
}
