"use client"

import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -200px' }

export function FadeIn({
    children,
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof motion.div>) {
    const shouldReduceMotion = useReducedMotion()
    const isInStaggerGroup = useContext(FadeInStaggerContext)

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            {...(isInStaggerGroup
                ? {}
                : {
                    initial: 'hidden',
                    whileInView: 'visible',
                    viewport,
                })}
            {...props}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function FadeInStagger({
    children,
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof motion.div>) {
    return (
        <FadeInStaggerContext.Provider value={true}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ staggerChildren: 0.2 }}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        </FadeInStaggerContext.Provider>
    )
}
