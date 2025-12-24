"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useLocale } from "@/lib/locale-context"

export default function VerifyEmailPage() {
  const { t } = useLocale()
  const router = useRouter()
  const supabase = createClient()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user && user.email_confirmed_at) {
        // User is authenticated and email is verified - redirect to home
        router.push("/")
      } else {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  if (isChecking) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="text-muted-foreground">{t.loading || "Loading..."}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">{t.verifyEmailTitle || "Проверьте почту"}</CardTitle>
            <CardDescription className="text-center">
              {t.verifyEmailSubtitle || "Мы отправили вам письмо с подтверждением"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              {t.verifyEmailDescription ||
                "Пожалуйста, проверьте вашу электронную почту и перейдите по ссылке для подтверждения аккаунта. После подтверждения вы сможете войти в систему."}
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/welcome">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToWelcome || "Вернуться на главную"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
