import { useState, useCallback, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { showActionToast } from "@/components/ui/action-toast"
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  ClockSnooze, 
  Archive, 
  Trash03,
  DotsVertical 
} from "@untitledui/icons"
import EmailList from "@/components/email-list"
import { ResizeHandle } from "@/components/ui/resize-handle"

// Left panel (Email List) resize settings
const LEFT_DEFAULT_WIDTH = 250
const LEFT_MIN_WIDTH = 200
const LEFT_MAX_WIDTH = 300
const SIDEBAR_OFFSET = 56

// Right panel (Chat Flow) resize settings
const RIGHT_DEFAULT_WIDTH = 410
const RIGHT_MIN_WIDTH = 350
const RIGHT_MAX_WIDTH = 500
const RIGHT_PADDING = 8

interface EmailDetailPageProps {
  className?: string
}

export default function EmailDetailPage({ className }: EmailDetailPageProps) {
  const { emailId } = useParams<{ emailId: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  // Left panel resize state
  const [leftPanelWidth, setLeftPanelWidth] = useState(LEFT_DEFAULT_WIDTH)
  const [isLeftAnimating, setIsLeftAnimating] = useState(false)

  // Right panel resize state
  const [rightPanelWidth, setRightPanelWidth] = useState(RIGHT_DEFAULT_WIDTH)
  const [isRightAnimating, setIsRightAnimating] = useState(false)

  // Track window width for right resize calculations
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ESC key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [location.pathname])

  const handleBack = () => {
    // Get the base path (inbox, assigned, drafts, done)
    const pathParts = location.pathname.split('/')
    const basePath = pathParts[1] || 'inbox'
    navigate(`/${basePath}`)
  }

  // Action handlers with toasts
  const handleMarkAsDone = useCallback(() => {
    showActionToast('done', () => {
      // Undo logic here
      console.log('Undoing mark as done for email:', emailId)
    })
  }, [emailId])

  const handleSnooze = useCallback(() => {
    showActionToast('snoozed', () => {
      // Undo logic here
      console.log('Undoing snooze for email:', emailId)
    })
  }, [emailId])

  const handleArchive = useCallback(() => {
    showActionToast('archived', () => {
      // Undo logic here
      console.log('Undoing archive for email:', emailId)
    })
  }, [emailId])

  const handleDelete = useCallback(() => {
    showActionToast('deleted', () => {
      // Undo logic here
      console.log('Undoing delete for email:', emailId)
    })
  }, [emailId])

  // Left panel resize handlers
  const handleLeftResize = useCallback((newWidth: number) => {
    setIsLeftAnimating(false)
    setLeftPanelWidth(newWidth)
  }, [])

  const handleLeftResizeEnd = useCallback(() => {
    setIsLeftAnimating(true)
    setLeftPanelWidth((current) => {
      if (current < LEFT_MIN_WIDTH) return LEFT_MIN_WIDTH
      if (current > LEFT_MAX_WIDTH) return LEFT_MAX_WIDTH
      return current
    })
  }, [])

  const handleLeftReset = useCallback(() => {
    setIsLeftAnimating(true)
    setLeftPanelWidth(LEFT_DEFAULT_WIDTH)
  }, [])

  // Right panel resize handlers
  // For right panel, position = windowWidth - RIGHT_PADDING - rightPanelWidth
  // So: rightPanelWidth = windowWidth - RIGHT_PADDING - position
  const rightDividerMinPos = windowWidth - RIGHT_PADDING - RIGHT_MAX_WIDTH // Divider at leftmost = max width
  const rightDividerMaxPos = windowWidth - RIGHT_PADDING - RIGHT_MIN_WIDTH // Divider at rightmost = min width

  const handleRightResize = useCallback((position: number) => {
    setIsRightAnimating(false)
    const newWidth = windowWidth - RIGHT_PADDING - position
    setRightPanelWidth(newWidth)
  }, [windowWidth])

  const handleRightResizeEnd = useCallback(() => {
    setIsRightAnimating(true)
    setRightPanelWidth((current) => {
      if (current < RIGHT_MIN_WIDTH) return RIGHT_MIN_WIDTH
      if (current > RIGHT_MAX_WIDTH) return RIGHT_MAX_WIDTH
      return current
    })
  }, [])

  const handleRightReset = useCallback(() => {
    setIsRightAnimating(true)
    setRightPanelWidth(RIGHT_DEFAULT_WIDTH)
  }, [])

  return (
    <div 
      className={cn(
        "bg-gray-cool-50 flex px-0 py-xl w-full h-screen overflow-hidden",
        className
      )}
    >
      {/* Global Sidebar */}
      <div className="h-full shrink-0 w-[56px]" />

      {/* Content Area - three column layout */}
      <div className="flex flex-1 h-full pl-0 pr-md">
        {/* Email List - Left Column */}
        <div 
          className={cn(
            "h-full shrink-0",
            "bg-white rounded-2xl",
            "border border-gray-cool-100",
            "overflow-hidden",
            isLeftAnimating && "transition-[width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          )}
          style={{ width: leftPanelWidth }}
        >
          <EmailList />
        </div>

        {/* Left Resize Handle */}
        <ResizeHandle
          direction="horizontal"
          positionOffset={SIDEBAR_OFFSET}
          minValue={LEFT_MIN_WIDTH}
          maxValue={LEFT_MAX_WIDTH}
          onResize={handleLeftResize}
          onResizeEnd={handleLeftResizeEnd}
          onReset={handleLeftReset}
          tooltipPosition="right"
        />

        {/* Email Content - Center Column (grows to fill) */}
        <div 
          className={cn(
            "flex-1 h-full min-w-0 flex flex-col relative",
            "bg-white rounded-2xl",
            "border border-gray-cool-100",
            "overflow-hidden"
          )}
        >
          {/* Header with back button and actions */}
          <div className="flex items-center justify-between p-[14px] border-b border-gray-cool-100 shrink-0">
            {/* Left side - Navigation controls */}
            <div className="flex items-center gap-xxs">
              {/* Back button with text */}
              <Tooltip content="Go back" shortcut="ESC" side="bottom">
                <Button
                  variant="tertiary-gray"
                  size="sm"
                  iconStart={<ChevronLeft size={20} />}
                  onClick={handleBack}
                  className="pl-sm pr-lg py-md"
                >
                  Back
                </Button>
              </Tooltip>
              
              {/* Previous email button */}
              <Tooltip content="Previous email" shortcut="K" side="bottom">
                <Button
                  variant="tertiary-gray"
                  size="sm"
                  iconStart={<ChevronDown size={20} />}
                  className="h-[36px] w-[36px] p-md"
                />
              </Tooltip>
              
              {/* Next email button */}
              <Tooltip content="Next email" shortcut="J" side="bottom">
                <Button
                  variant="tertiary-gray"
                  size="sm"
                  iconStart={<ChevronUp size={20} />}
                  className="h-[36px] w-[36px] p-md"
                />
              </Tooltip>
            </div>

            {/* Right side - Email actions */}
            <div className="flex items-center gap-md">
              {/* Email action buttons */}
              <div className="flex items-center gap-xxs">
                {/* Mark as done */}
                <Tooltip content="Mark as done" shortcut="E" side="bottom">
                  <Button
                    variant="tertiary-gray"
                    size="sm"
                    iconStart={<CheckCircle size={20} />}
                    className="h-[36px] w-[36px] p-md"
                    onClick={handleMarkAsDone}
                  />
                </Tooltip>
                
                {/* Snooze */}
                <Tooltip content="Snooze" shortcut="H" side="bottom">
                  <Button
                    variant="tertiary-gray"
                    size="sm"
                    iconStart={<ClockSnooze size={20} />}
                    className="h-[36px] w-[36px] p-md"
                    onClick={handleSnooze}
                  />
                </Tooltip>
                
                {/* Archive */}
                <Tooltip content="Archive" shortcut="A" side="bottom">
                  <Button
                    variant="tertiary-gray"
                    size="sm"
                    iconStart={<Archive size={20} />}
                    className="h-[36px] w-[36px] p-md"
                    onClick={handleArchive}
                  />
                </Tooltip>
                
                {/* Delete */}
                <Tooltip content="Delete" shortcut="#" side="bottom">
                  <Button
                    variant="tertiary-gray"
                    size="sm"
                    iconStart={<Trash03 size={20} />}
                    className="h-[36px] w-[36px] p-md"
                    onClick={handleDelete}
                  />
                </Tooltip>
              </div>
              
              {/* Divider */}
              <div className="w-[1.5px] h-[21px] bg-gray-cool-100 rounded-full" />
              
              {/* More options */}
              <Tooltip content="More options" side="bottom">
                <Button
                  variant="tertiary-gray"
                  size="sm"
                  iconStart={<DotsVertical size={20} />}
                  className="h-[36px] w-[36px] p-md"
                />
              </Tooltip>
            </div>
          </div>

          {/* Email content area */}
          <div className="flex-1 overflow-y-auto p-xl">
            {/* Email content goes here */}
          </div>
        </div>

        {/* Right Resize Handle */}
        <ResizeHandle
          direction="horizontal"
          positionOffset={0}
          minValue={rightDividerMinPos}
          maxValue={rightDividerMaxPos}
          onResize={handleRightResize}
          onResizeEnd={handleRightResizeEnd}
          onReset={handleRightReset}
          tooltipPosition="left"
        />

        {/* Right Column - Chat Flow Panels */}
        <div 
          className={cn(
            "flex flex-col gap-md h-full shrink-0",
            isRightAnimating && "transition-[width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          )}
          style={{ width: rightPanelWidth }}
        >
          {/* Top Panel - Fixed height */}
          <div 
            className={cn(
              "w-full h-[220px] shrink-0",
              "bg-white rounded-2xl",
              "border border-gray-cool-100"
            )}
          >
            {/* Chat flow content goes here */}
          </div>

          {/* Bottom Panel - Grows to fill */}
          <div 
            className={cn(
              "w-full flex-1 min-h-0",
              "bg-white rounded-2xl",
              "border border-gray-cool-100"
            )}
          >
            {/* Chat flow content goes here */}
          </div>
        </div>
      </div>
    </div>
  )
}
