import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ResizeHandleProps {
  /** Direction of resize - horizontal (left/right) or vertical (up/down) */
  direction?: 'horizontal' | 'vertical';
  /** Offset from edge to calculate position (e.g., sidebar width) */
  positionOffset?: number;
  /** Minimum value for resize (enables elastic animation) */
  minValue?: number;
  /** Maximum value for resize (enables elastic animation) */
  maxValue?: number;
  /** Maximum elastic overflow in pixels. Default: 15 */
  maxElasticOverflow?: number;
  /** Position of tooltip relative to cursor. Default: 'right' */
  tooltipPosition?: 'left' | 'right';
  /** Show tooltip with resize instructions. Default: true */
  showTooltip?: boolean;
  /** Delay before showing tooltip in ms. Default: 600 */
  tooltipDelay?: number;
  /** Whether the handle is currently being dragged (controlled) */
  isResizing?: boolean;
  /** Called when resizing starts */
  onResizeStart?: () => void;
  /** Called during resize with position value */
  onResize?: (position: number) => void;
  /** Called when resizing ends */
  onResizeEnd?: () => void;
  /** Called when double-click to reset to default */
  onReset?: () => void;
  /** Additional className for the container */
  className?: string;
}

const ResizeHandle = React.forwardRef<HTMLDivElement, ResizeHandleProps>(
  (
    {
      // Layout props
      direction = 'horizontal',
      positionOffset = 0,
      className,
      // Elastic animation props
      minValue,
      maxValue,
      maxElasticOverflow = 15,
      // Tooltip props
      tooltipPosition = 'right',
      showTooltip = true,
      tooltipDelay = 600,
      // State props
      isResizing: controlledIsResizing,
      // Callback props
      onResizeStart,
      onResize,
      onResizeEnd,
      onReset,
    },
    ref
  ) => {
    // Internal state
    const [internalIsResizing, setInternalIsResizing] = React.useState(false);
    const [isSnappingBack, setIsSnappingBack] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [showTooltipVisible, setShowTooltipVisible] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    
    // Refs
    const tooltipTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const handleRef = React.useRef<HTMLDivElement | null>(null);
    
    // Computed values
    const isResizing = controlledIsResizing ?? internalIsResizing;
    const isHorizontal = direction === 'horizontal';

    // Combine refs
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        handleRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Clear tooltip timeout helper
    const clearTooltipTimeout = React.useCallback(() => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
      }
    }, []);

    // Mouse event handlers
    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        setInternalIsResizing(true);
        setIsSnappingBack(false);
        setShowTooltipVisible(false);
        clearTooltipTimeout();
        onResizeStart?.();
      },
      [onResizeStart, clearTooltipTimeout]
    );

    const handleDoubleClick = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSnappingBack(true);
        onReset?.();
      },
      [onReset]
    );

    const handleMouseEnter = React.useCallback(() => {
      setIsHovered(true);
      if (showTooltip && !isResizing) {
        tooltipTimeoutRef.current = setTimeout(() => {
          setShowTooltipVisible(true);
        }, tooltipDelay);
      }
    }, [showTooltip, tooltipDelay, isResizing]);

    const handleMouseLeave = React.useCallback(() => {
      setIsHovered(false);
      setShowTooltipVisible(false);
      clearTooltipTimeout();
    }, [clearTooltipTimeout]);

    const handleLocalMouseMove = React.useCallback((e: React.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, []);

    // Global mouse move handler with elastic effect
    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (!isResizing) return;

        // Calculate raw value based on direction
        const rawValue = isHorizontal
          ? e.clientX - positionOffset
          : e.clientY - positionOffset;

        let newValue = rawValue;

        // Apply elastic effect when exceeding bounds
        // Uses asymptotic curve for smooth slowdown approaching max overflow
        if (minValue !== undefined && rawValue < minValue) {
          const overflow = minValue - rawValue;
          const elasticOverflow = maxElasticOverflow * (1 - 1 / (1 + overflow / 30));
          newValue = minValue - elasticOverflow;
        } else if (maxValue !== undefined && rawValue > maxValue) {
          const overflow = rawValue - maxValue;
          const elasticOverflow = maxElasticOverflow * (1 - 1 / (1 + overflow / 30));
          newValue = maxValue + elasticOverflow;
        }

        onResize?.(newValue);
      },
      [isResizing, isHorizontal, positionOffset, minValue, maxValue, maxElasticOverflow, onResize]
    );

    const handleMouseUp = React.useCallback(() => {
      setInternalIsResizing(false);
      setIsSnappingBack(true);
      onResizeEnd?.();
    }, [onResizeEnd]);

    // Cleanup tooltip timeout on unmount
    React.useEffect(() => {
      return () => clearTooltipTimeout();
    }, [clearTooltipTimeout]);

    // Global mouse event listeners during resize
    React.useEffect(() => {
      if (isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }, [isResizing, handleMouseMove, handleMouseUp, isHorizontal]);

    // Tooltip position styles
    const tooltipStyles = React.useMemo(() => {
      if (tooltipPosition === 'left') {
        return {
          left: mousePosition.x - 12,
          top: mousePosition.y,
          transform: 'translate(-100%, -50%)',
        };
      }
      return {
        left: mousePosition.x + 12,
        top: mousePosition.y,
        transform: 'translateY(-50%)',
      };
    }, [tooltipPosition, mousePosition.x, mousePosition.y]);

    return (
      <>
        {/* Resize Handle */}
        <div
          ref={setRefs}
          className={cn(
            'shrink-0 group flex items-center justify-center relative',
            isHorizontal
              ? 'h-full w-[6px] cursor-col-resize'
              : 'w-full h-[6px] cursor-row-resize',
            className
          )}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleLocalMouseMove}
          data-snapping={isSnappingBack}
        >
          {/* Visual indicator line */}
          <div
            className={cn(
              'transition-colors duration-150',
              isHorizontal ? 'w-[2px] h-full' : 'h-[2px] w-full',
              isResizing
                ? 'bg-gray-cool-200'
                : 'bg-transparent group-hover:bg-gray-cool-100'
            )}
          />
        </div>

        {/* Cursor-following tooltip */}
        {showTooltipVisible && isHovered && !isResizing && (
          <div
            className="fixed z-50 pointer-events-none"
            style={tooltipStyles}
          >
            <div 
              className="bg-gray-cool-800 text-white text-xs font-medium px-sm py-xs rounded-md shadow-lg border border-gray-cool-700 whitespace-nowrap"
              style={{ animation: 'resizeTooltipSlide 150ms ease-out' }}
            >
              <div><span className="text-gray-cool-400">Drag</span> = resize</div>
              <div><span className="text-gray-cool-400">Double-click</span> = reset</div>
            </div>
          </div>
        )}
      </>
    );
  }
);

ResizeHandle.displayName = 'ResizeHandle';

export { ResizeHandle };
