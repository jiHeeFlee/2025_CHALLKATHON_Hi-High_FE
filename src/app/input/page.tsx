'use client'

import { useEffect, useState } from 'react'
import InputStep from '@/app/input/components/InputStep'
import { INPUT_STEPS } from '@/constants/auth'
import { useRouter } from 'next/navigation'
import instance from '@/auth/axios'

interface UserInfo {
  id: number
  loginId: string
  name: string
  provider: string
  providerId: string
  userRole: string
}

export default function InputFlowPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const router = useRouter()

  const [interests, setInterests] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])
  const [desiredOccupation, setDesiredOccupation] = useState<string[]>([])

  useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const response = await instance.get('/api/auth/user-info')
      const data = response.data
      console.log('[유저 정보]:', data)
      setUserInfo(data)

      if (data.interests && data.goals && data.desiredOccupation) {
        router.push('/home')
      }
    } catch (error) {
      console.error('유저 정보 가져오기 실패:', error)
    }
  }

  fetchUserInfo()
}, [])


  const handleNext = async (stepKeywords: string[]) => {
  if (currentStep === 0) {
    setInterests(stepKeywords)
    setCurrentStep(1)
  } else if (currentStep === 1) {
    setGoals(stepKeywords)
    setCurrentStep(2)
  } else if (currentStep === 2 && userInfo) {
    const payload = {
      interests: interests.join(', '),
      goals: goals.join(', '),
      desiredOccupation: stepKeywords.join(', '),
    }

    console.log('최종 전송 payload:', payload)

    try {
      await instance.post('/api/auth/update-info', payload)
      router.push('/home')
    } catch (e) {
      console.error('정보 전송 실패:', e)
    }
  }
}



  const step = INPUT_STEPS[currentStep]

  return (
    <InputStep
      title={`${userInfo?.name?.slice(1) || '사용자'}님의`}
      highlight={step.highlight}
      subtitle={step.subtitle}
      placeholder={step.placeholder}
      currentStep={currentStep + 1}
      totalStep={INPUT_STEPS.length}
      onNext={handleNext}
    />
  )
}
