import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchLg } from '@untitledui/icons'
import { cn } from '@/lib/utils'
import { useShortcuts, isMac } from '@/lib/shortcuts'
import { Shortcut } from './shortcut'

/**
 * Command palette root component
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-xl bg-white',
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

/**
 * Command dialog that opens with Cmd+K
 */
interface CommandDialogProps {
  children?: React.ReactNode
}

function CommandDialog({ children }: CommandDialogProps) {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useShortcuts()

  // Close on escape
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen, setCommandPaletteOpen])

  if (!isCommandPaletteOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-50 bg-[#0E101B]/60 backdrop-blur-sm"
        onClick={() => setCommandPaletteOpen(false)}
      />
      {/* Command dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-[560px] -translate-x-1/2 -translate-y-1/2 px-xl">
        <Command
          className={cn(
            'rounded-xl bg-white',
            // Skeuomorphic shadow matching design system
            'shadow-[0_24px_48px_-12px_rgba(14,16,27,0.18),0_0_0_1px_rgba(125,137,176,0.1)]'
          )}
        >
          {children}
        </Command>
      </div>
    </>
  )
}

/**
 * Command input with search icon
 */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center gap-lg border-b border-gray-cool-100 px-xl"
    // eslint-disable-next-line react/no-unknown-property
    cmdk-input-wrapper=""
  >
    <SearchLg className="size-[20px] shrink-0 text-gray-cool-400" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-[52px] w-full bg-transparent',
        'text-sm text-gray-cool-900 placeholder:text-gray-cool-400',
        'outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
    {/* Shortcut hint */}
    <kbd className="hidden sm:inline-flex items-center gap-xxs px-sm py-xxs rounded-xs bg-gray-cool-50 border border-gray-cool-100 text-xxs text-gray-cool-500 font-medium">
      ESC
    </kbd>
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

/**
 * Scrollable list of commands
 */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'max-h-[320px] overflow-y-auto overflow-x-hidden py-md',
      className
    )}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

/**
 * Empty state when no results found
 */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-gray-cool-500"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

/**
 * Group of commands with a heading
 */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden',
      '[&_[cmdk-group-heading]]:px-xl [&_[cmdk-group-heading]]:py-md',
      '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-cool-500',
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

/**
 * Separator between groups
 */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('h-[1px] bg-gray-cool-100 my-sm mx-xl', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

/**
 * Individual command item
 */
interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  /** Optional icon to display */
  icon?: React.ReactNode
  /** Optional keyboard shortcut */
  shortcut?: string
  /** Whether to show command modifier with shortcut */
  shortcutShowCommand?: boolean
}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, icon, shortcut, shortcutShowCommand = true, children, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex items-center gap-lg px-xl py-md mx-md rounded-sm cursor-pointer select-none',
      'text-sm text-gray-cool-700',
      // Hover and selected states
      'data-[selected=true]:bg-gray-cool-50',
      'outline-none',
      className
    )}
    {...props}
  >
    {icon && (
      <span className="shrink-0 size-[20px] flex items-center justify-center text-gray-cool-400">
        {icon}
      </span>
    )}
    <span className="flex-1">{children}</span>
    {shortcut && (
      <Shortcut
        keys={shortcut}
        theme="light"
        showCommand={shortcutShowCommand}
      />
    )}
  </CommandPrimitive.Item>
))
CommandItem.displayName = CommandPrimitive.Item.displayName

/**
 * Shortcut display in the command item
 */
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-gray-cool-400',
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = 'CommandShortcut'

/**
 * Complete command palette that auto-populates from registered shortcuts
 */
function CommandPalette() {
  const { shortcuts, setCommandPaletteOpen } = useShortcuts()
  const [search, setSearch] = React.useState('')

  // Group shortcuts by their group property
  const groupedShortcuts = React.useMemo(() => {
    const groups = new Map<string, typeof shortcuts extends Map<string, infer V> ? V[] : never>()
    
    shortcuts.forEach((shortcut) => {
      const group = shortcut.group || 'Actions'
      if (!groups.has(group)) {
        groups.set(group, [])
      }
      groups.get(group)!.push(shortcut)
    })
    
    return groups
  }, [shortcuts])

  const handleSelect = React.useCallback(
    (shortcutId: string) => {
      const shortcut = shortcuts.get(shortcutId)
      if (shortcut) {
        setCommandPaletteOpen(false)
        // Small delay to allow dialog to close before action
        setTimeout(() => shortcut.action(), 50)
      }
    },
    [shortcuts, setCommandPaletteOpen]
  )

  return (
    <CommandDialog>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Array.from(groupedShortcuts.entries()).map(([group, items]) => (
          <CommandGroup key={group} heading={group}>
            {items.map((shortcut) => (
              <CommandItem
                key={shortcut.id}
                value={shortcut.label}
                icon={shortcut.icon}
                shortcut={shortcut.key}
                shortcutShowCommand={shortcut.withMeta ?? true}
                onSelect={() => handleSelect(shortcut.id)}
              >
                {shortcut.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
      {/* Footer with hints */}
      <div className="flex items-center justify-between border-t border-gray-cool-100 px-xl py-md text-xs text-gray-cool-500">
        <div className="flex items-center gap-xl">
          <span className="flex items-center gap-xs">
            <kbd className="px-xs py-xxs rounded-xxs bg-gray-cool-50 border border-gray-cool-100 text-xxs">↑↓</kbd>
            <span>Navigate</span>
          </span>
          <span className="flex items-center gap-xs">
            <kbd className="px-xs py-xxs rounded-xxs bg-gray-cool-50 border border-gray-cool-100 text-xxs">↵</kbd>
            <span>Select</span>
          </span>
        </div>
        <span className="flex items-center gap-xs">
          <kbd className="px-sm py-xxs rounded-xxs bg-gray-cool-50 border border-gray-cool-100 text-xxs">
            {isMac ? '⌘' : 'Ctrl'}K
          </kbd>
          <span>Open</span>
        </span>
      </div>
    </CommandDialog>
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandPalette,
}

