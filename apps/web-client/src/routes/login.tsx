import { H1, H3, P } from '@/components/ui/typography'
import { APP_CONFIG } from '@/config/app.config'
import { LoginForm } from '@/screens/auth/login/login-form'
import { createFileRoute, } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Comp,
})

function Comp() {
  return (
    <div className="relative container flex-1 shrink-0 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="text-primary relative hidden h-full flex-col p-10 lg:flex dark:border-r">
        <div
          className="bg-primary/5 absolute inset-0"
          style={{
            backgroundImage: `url(${APP_CONFIG.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="flex items-center justify-center lg:h-screen p-8 max-lg:mx-auto max-lg:py-12">
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-md">
          <div className="flex flex-col gap-2 text-center">
            <H3 className='text-muted-foreground'>
              Login To
            </H3>
            <H1>{APP_CONFIG.name}</H1>
            <P className='text-sm'>
              {APP_CONFIG.desc}
            </P>
          </div>
          <LoginForm />
          <P className='text-center text-sm'>
            Only registered participants can log in to take part in live quizzes, while administrators have access to manage quizzes, monitor activity, and control sessions.
          </P>
        </div>
      </div>
    </div>
  )
}
