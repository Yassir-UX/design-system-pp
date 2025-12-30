import * as React from 'react'
import { useCallback, useEffect, useRef, createContext, useContext, useState } from 'react'

// Types for the shortcut system
export interface ShortcutAction {
  /** Unique identifier for this shortcut */
  id: string
  /** Display label for the command palette */
  label: string
  /** The key to press (e.g., "B", "K", "Enter") */
  key: string
  /** Whether to require Cmd/Ctrl modifier (default: true) */
  withMeta?: boolean
  /** Action to execute when shortcut is triggered */
  action: () => void
  /** Optional group for organizing in command palette */
  group?: string
  /** Optional icon element */
  icon?: React.ReactNode
}

interface ShortcutContextValue {
  /** All registered shortcuts */
  shortcuts: Map<string, ShortcutAction>
  /** Register a new shortcut */
  register: (shortcut: ShortcutAction) => void
  /** Unregister a shortcut by id */
  unregister: (id: string) => void
  /** Whether command palette is open */
  isCommandPaletteOpen: boolean
  /** Set command palette open state */
  setCommandPaletteOpen: (open: boolean) => void
}

const ShortcutContext = createContext<ShortcutContextValue | null>(null)

/**
 * Check if the user is on macOS
 */
const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

/**
 * Check if the target is an input element where shortcuts should be disabled
 */
function isInputElement(element: EventTarget | null): boolean {
  if (!element || !(element instanceof HTMLElement)) return false
  
  const tagName = element.tagName.toLowerCase()
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
    return true
  }
  
  // Check for contenteditable
  if (element.isContentEditable) {
    return true
  }
  
  return false
}

/**
 * Generate a key for the shortcuts map from key + modifiers
 */
function getShortcutKey(key: string, withMeta: boolean): string {
  return withMeta ? `meta+${key.toLowerCase()}` : key.toLowerCase()
}

/**
 * Provider component that enables keyboard shortcuts throughout the app
 */
export function ShortcutProvider({ children }: { children: React.ReactNode }) {
  const shortcutsRef = useRef<Map<string, ShortcutAction>>(new Map())
  const [shortcuts, setShortcuts] = useState<Map<string, ShortcutAction>>(new Map())
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false)

  const register = useCallback((shortcut: ShortcutAction) => {
    const key = getShortcutKey(shortcut.key, shortcut.withMeta ?? true)
    shortcutsRef.current.set(shortcut.id, { ...shortcut, key: shortcut.key })
    setShortcuts(new Map(shortcutsRef.current))
  }, [])

  const unregister = useCallback((id: string) => {
    shortcutsRef.current.delete(id)
    setShortcuts(new Map(shortcutsRef.current))
  }, [])

  // Global keyboard listener
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Don't trigger shortcuts when typing in inputs (unless command palette)
      if (isInputElement(event.target) && !isCommandPaletteOpen) {
        return
      }

      // Check for Cmd+K (or Ctrl+K) to open command palette
      const metaKey = isMac ? event.metaKey : event.ctrlKey
      if (metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(prev => !prev)
        return
      }

      // Don't process other shortcuts if command palette is open
      if (isCommandPaletteOpen) {
        return
      }

      // Find matching shortcut
      for (const [, shortcut] of shortcutsRef.current) {
        const requiresMeta = shortcut.withMeta ?? true
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const metaMatches = requiresMeta ? metaKey : !metaKey

        if (keyMatches && metaMatches) {
          event.preventDefault()
          shortcut.action()
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen])

  const value: ShortcutContextValue = {
    shortcuts,
    register,
    unregister,
    isCommandPaletteOpen,
    setCommandPaletteOpen,
  }

  return (
    <ShortcutContext.Provider value={value}>
      {children}
    </ShortcutContext.Provider>
  )
}

/**
 * Hook to access the shortcut context
 */
export function useShortcuts() {
  const context = useContext(ShortcutContext)
  if (!context) {
    throw new Error('useShortcuts must be used within a ShortcutProvider')
  }
  return context
}

/**
 * Hook to register a keyboard shortcut
 * Automatically unregisters when component unmounts
 */
export function useRegisterShortcut(shortcut: ShortcutAction | null) {
  const { register, unregister } = useShortcuts()
  
  useEffect(() => {
    if (!shortcut) return
    
    register(shortcut)
    return () => unregister(shortcut.id)
  }, [shortcut?.id, shortcut?.key, shortcut?.action, register, unregister])
}

/**
 * Hook to register multiple shortcuts at once
 */
export function useRegisterShortcuts(shortcuts: ShortcutAction[]) {
  const { register, unregister } = useShortcuts()
  
  useEffect(() => {
    shortcuts.forEach(shortcut => register(shortcut))
    return () => shortcuts.forEach(shortcut => unregister(shortcut.id))
  }, [shortcuts, register, unregister])
}

/**
 * Utility to get the modifier key symbol for display
 */
export function getModifierSymbol(): string {
  return isMac ? '⌘' : 'Ctrl'
}

/**
 * Check if running on Mac
 */
export { isMac }



