'use client'

import { useEffect, useState } from 'react'
import InputStep from '@/app/input/components/InputStep'
import { INPUT_STEPS } from '@/constants/auth'
import { useRouter } from 'next/navigation'
import instance from '@/auth/axios'

export default function InputFlowPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [username, setUsername] = useState('승민') // 이름 고정 또는 추후 상태 연결
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
        const finalInterests = interests.join(', ')
        const finalGoals = goals.join(', ')
        const finalDesiredOccupation = stepKeywords.join(', ')

        const payload = {
          interests: finalInterests,
          goals: finalGoals,
          desiredOccupation: finalDesiredOccupation,
        }

      console.log('전송 payload:', payload)

      try {
        const response = await instance.post('/api/auth/update-info', payload)
        console.log('응답 결과:', response.data)
        router.push('/home') 
      } catch (e) {
        console.error('전송 실패:', e)
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
