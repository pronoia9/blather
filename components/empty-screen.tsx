import { welcomeMessage } from '@/data'

export function EmptyScreen() {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border p-8 gradient-outline-bg">
          <h1 className="text-lg font-semibold">{welcomeMessage.title}</h1>
          {welcomeMessage?.subtitles.map((text, i) => (
            <p key={`welcome-msg-${i}`} className="leading-normal text-muted-foreground">
              {text}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}
