import { ExternalLink } from '@/components/external-link'
import { IconGitHub, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

// HEADER
export const socialLinks = [
  <a
    key="socials-github"
    href="https://github.com/pronoia9"
    target="_blank"
    rel="noopener noreferrer"
    className={`${cn(buttonVariants({ variant: 'gradient-outline' }))} hover:gradient-clr`}
  >
    <IconGitHub />
    <span className="ml-2 flex sm:hidden">GitHub</span>
  </a>
]

// CHAT SECTION
export const welcomeMessage = {
  title: 'Welcome to Blather AI chatbot!',
  subtitles: [
    <>
      This is an open source AI chatbot app template built with <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, the{' '}
      <ExternalLink href="https://sdk.vercel.ai">Vercel AI SDK</ExternalLink>, and{' '}
      <ExternalLink href="https://vercel.com/storage/kv">Vercel KV</ExternalLink>.
    </>,
    <>
      It uses <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">React Server Components</ExternalLink> to combine text with
      generative UI as output of the LLM. The UI state is synced through the SDK so the model is aware of your interactions as they happen.
    </>
  ]
}

export const exampleMessages = [
  {
    heading: 'What are the',
    subheading: 'trending memecoins today?',
    message: `What are the trending memecoins today?`
  },
  {
    heading: 'What is the price of',
    subheading: '$DOGE right now?',
    message: 'What is the price of $DOGE right now?'
  },
  {
    heading: 'I would like to buy',
    subheading: '42 $DOGE',
    message: `I would like to buy 42 $DOGE`
  },
  {
    heading: 'What are some',
    subheading: `recent events about $DOGE?`,
    message: `What are some recent events about $DOGE?`
  }
]

export const footerMessage = (
  <>
    Open source AI chatbot built with <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
    <ExternalLink href="https://github.com/vercel/ai">Vercel AI SDK</ExternalLink>.
  </>
)
