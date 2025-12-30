import * as React from "react"
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"
import { cn } from "@/lib/utils"
import { 
  CheckCircle, 
  ClockSnooze, 
  Archive, 
  Trash03,
} from "@untitledui/icons"

// Action types
export type ActionType = 'done' | 'snoozed' | 'archived' | 'deleted'

// Action configuration
const ACTION_CONFIG: Record<ActionType, { 
  message: string
  icon: React.ReactNode 
}> = {
  done: {
    message: 'Marked as done',
    icon: <CheckCircle size={14} strokeWidth={2.5} />,
  },
  snoozed: {
    message: 'Snoozed',
    icon: <ClockSnooze size={14} strokeWidth={2.5} />,
  },
  archived: {
    message: 'Archived',
    icon: <Archive size={14} strokeWidth={2.5} />,
  },
  deleted: {
    message: 'Moved to trash',
    icon: <Trash03 size={14} strokeWidth={2.5} />,
  },
}

// Custom toast content component
interface ActionToastContentProps {
  action: ActionType
  onUndo?: () => void
  toastId: string | number
}

function ActionToastContent({ action, onUndo, toastId }: ActionToastContentProps) {
  const config = ACTION_CONFIG[action]
  
  const handleUndo = () => {
    if (onUndo) {
      onUndo()
    }
    sonnerToast.dismiss(toastId)
  }
  
  return (
    <div 
      className={cn(
        "flex items-center gap-md",
        "bg-gray-cool-800 border border-gray-cool-700",
        "rounded-sm",
        "pl-sm pr-lg py-sm",
        "shadow-[0px_12px_12px_0px_rgba(9,21,57,0.07),0px_3px_7px_0px_rgba(9,21,57,0.09)]",
      )}
    >
      {/* Icon container */}
      <div 
        className={cn(
          "flex items-center justify-center p-sm",
          "bg-[rgba(21,112,239,0.5)] rounded-xs"
        )}
      >
        <span className="text-blue-light-400">
          {config.icon}
        </span>
      </div>
      
      {/* Message */}
      <span className="text-sm font-medium text-gray-cool-300 whitespace-nowrap">
        {config.message}
      </span>
      
      {/* Dot separator */}
      <div className="w-[4px] h-[4px] rounded-full bg-gray-cool-600 shrink-0" />
      
      {/* Undo button */}
      <button
        onClick={handleUndo}
        className={cn(
          "text-sm font-medium text-blue-light-400",
          "hover:text-blue-light-300",
          "active:scale-95",
          "transition-all duration-150",
          "whitespace-nowrap"
        )}
      >
        Undo
      </button>
    </div>
  )
}

// Show action toast function
export function showActionToast(action: ActionType, onUndo?: () => void) {
  const toastId = sonnerToast.custom(
    (id) => (
      <ActionToastContent 
        action={action} 
        onUndo={onUndo} 
        toastId={id}
      />
    ),
    {
      duration: 4000,
      position: 'bottom-center',
    }
  )
  
  return toastId
}

// Styled Toaster component
export function ActionToaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      offset={24}
      gap={8}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "pointer-events-auto",
        },
      }}
    />
  )
}
