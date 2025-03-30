"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/593992282860"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </motion.a>
  )
}

