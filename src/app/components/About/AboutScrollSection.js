'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'

export default function AboutScrollSection() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const text = `Mimaansa's success is best measured by the success of our clients. 
  Many have trusted us as their long-term sourcing arm in India, and much of our new business comes from client referrals — 
  a testament to the trust and satisfaction we've earned. 
  We continue to build on our track record every day, striving to set new benchmarks in service excellence.`

  // Precompute word/letter structure once
  const { words, totalChars } = useMemo(() => {
    const wordArr = text.split(' ')
    const total = text.length
    return { words: wordArr, totalChars: total }
  }, [text])

  return (
    <section className='min-h-screen bg-[#27272A] flex flex-col justify-center items-center md:py-20'>

      <section
        ref={containerRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-6xl">
          <div className="w-full flex justify-center items-center">
            <div className="max-w-5xl text-center flex flex-wrap justify-center">
              {words.map((word, wIndex) => {
                // This calculates where this word starts in the whole string
                const wordStartIndex = words
                  .slice(0, wIndex)
                  .join(' ').length + (wIndex > 0 ? 1 : 0) // +1 for spaces

                return (
                  <span key={wIndex} className="mr-2">
                    {word.split('').map((letter, lIndex) => {
                      const globalCharIndex = wordStartIndex + lIndex

                      const color = useTransform(
                        scrollYProgress,
                        [
                          globalCharIndex / totalChars,
                          (globalCharIndex + 1) / totalChars
                        ],
                        ['#666666', '#FFFFFF']
                      )

                      return (
                        <motion.span
                          key={lIndex}
                          style={{ color }}
                          className="md:text-[30px] leading-relaxed"
                        >
                          {letter}
                        </motion.span>
                      )
                    })}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
