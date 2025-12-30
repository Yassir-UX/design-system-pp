import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

export interface EmailGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The date label for this group (e.g., "Today", "Yesterday", "Dec 23") */
  dateLabel: string
  /** IDs of selected items within this group */
  selectedIds?: Set<string>
  /** All item IDs in this group */
  itemIds: string[]
  /** Callback when group selection changes - passes all item IDs when selecting, empty when deselecting */
  onSelectAll?: (ids: string[], selected: boolean) => void
  /** Children - typically EmailRow components */
  children: React.ReactNode
}

const EmailGroup = React.forwardRef<HTMLDivElement, EmailGroupProps>(
  (
    {
      className,
      dateLabel,
      selectedIds = new Set(),
      itemIds,
      onSelectAll,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    
    // Calculate selection state
    const selectedCount = itemIds.filter(id => selectedIds.has(id)).length
    const totalCount = itemIds.length
    const isAllSelected = totalCount > 0 && selectedCount === totalCount
    const isPartiallySelected = selectedCount > 0 && selectedCount < totalCount
    
    // Show checkbox when hovering or when any items are selected
    const showCheckbox = isHovered || selectedCount > 0

    const handleGroupSelect = (checked: boolean | "indeterminate") => {
      if (onSelectAll) {
        // When clicking, select all if not already all selected
        const shouldSelectAll = !isAllSelected
        onSelectAll(itemIds, shouldSelectAll)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {/* Group header with date and checkbox */}
        <div 
          className="flex items-center gap-md pl-md pr-4xl pt-xl pb-md border-b border-gray-cool-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Checkbox - shows indeterminate state when partially selected */}
          <Checkbox
            checked={isAllSelected ? true : isPartiallySelected ? "indeterminate" : false}
            indeterminate={isPartiallySelected}
            onCheckedChange={handleGroupSelect}
            className={cn(
              "transition-opacity duration-150",
              showCheckbox ? "opacity-100" : "opacity-0"
            )}
          />
          
          {/* Date label */}
          <span className="text-sm font-normal text-gray-cool-300">
            {dateLabel}
          </span>
        </div>

        {/* Email rows container */}
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    )
  }
)

EmailGroup.displayName = "EmailGroup"

export { EmailGroup }

