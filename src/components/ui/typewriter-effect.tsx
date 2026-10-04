"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `text-white opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-cyan-400",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export type TypewriterWord = {
  text: string;
  className?: string;
};

export const TypewriterEffectSmooth = ({
  words,
  cyclePhrases,
  className,
  cursorClassName,
  textClassName,
  typeDuration = 1.6,
  eraseDuration = 0.6,
  pauseDuration = 2200,
}: {
  words?: TypewriterWord[];
  cyclePhrases?: TypewriterWord[][];
  className?: string;
  cursorClassName?: string;
  textClassName?: string;
  typeDuration?: number;
  eraseDuration?: number;
  pauseDuration?: number;
}) => {
  const phrases = cyclePhrases && cyclePhrases.length > 0 ? cyclePhrases : words ? [words] : [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1) return;

    let timeout: NodeJS.Timeout;
    if (!isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, (typeDuration * 1000) + pauseDuration);
    } else {
      timeout = setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % phrases.length);
        setIsDeleting(false);
      }, (eraseDuration * 1000) + 120);
    }

    return () => clearTimeout(timeout);
  }, [currentIdx, isDeleting, phrases.length, typeDuration, eraseDuration, pauseDuration]);

  const activePhrase = phrases[currentIdx] || [];
  const wordsArray = activePhrase.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex items-center space-x-1.5 my-3 max-w-full overflow-hidden", className)}>
      <motion.div
        key={`phrase-${currentIdx}-${isDeleting ? "del" : "type"}`}
        className="overflow-hidden pb-1 max-w-full"
        initial={{
          width: isDeleting ? "100%" : "0%",
        }}
        animate={{
          width: isDeleting ? "0%" : "fit-content",
        }}
        transition={{
          duration: isDeleting ? eraseDuration : typeDuration,
          ease: isDeleting ? "easeInOut" : "linear",
        }}
      >
        <div
          className={cn(
            "text-xs sm:text-base md:text-xl lg:text-2xl font-semibold truncate",
            textClassName
          )}
          style={{
            whiteSpace: "nowrap",
          }}
        >
          <div className="inline-block">
            {wordsArray.map((word, idx) => (
              <div key={`word-${currentIdx}-${idx}`} className="inline-block">
                {word.text.map((char, index) => (
                  <span
                    key={`char-${index}`}
                    className={cn(`text-white`, word.className)}
                  >
                    {char}
                  </span>
                ))}
                &nbsp;
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[3px] h-5 sm:h-6 md:h-7 bg-cyan-400 self-center shrink-0",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
