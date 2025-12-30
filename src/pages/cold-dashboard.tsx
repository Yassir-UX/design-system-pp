import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import EmailList from '../components/email-list';
import { ResizeHandle } from '../components/ui/resize-handle';

const DEFAULT_WIDTH = 250;
const MIN_WIDTH = 200;
const MAX_WIDTH = 300;
const SIDEBAR_OFFSET = 56;

export default function ColdDashboard() {
  const [leftPanelWidth, setLeftPanelWidth] = useState(DEFAULT_WIDTH);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleResize = useCallback((newWidth: number) => {
    setIsAnimating(false);
    setLeftPanelWidth(newWidth);
  }, []);

  const handleResizeEnd = useCallback(() => {
    // Snap back to clamped value with animation
    setIsAnimating(true);
    setLeftPanelWidth((current) => {
      if (current < MIN_WIDTH) return MIN_WIDTH;
      if (current > MAX_WIDTH) return MAX_WIDTH;
      return current;
    });
  }, []);

  const handleReset = useCallback(() => {
    setIsAnimating(true);
    setLeftPanelWidth(DEFAULT_WIDTH);
  }, []);

  return (
    <div className="bg-gray-cool-50 flex pl-0 pr-md py-xl w-full h-screen overflow-hidden">
      {/* Global Sidebar */}
      <div className="h-full shrink-0 w-[56px]" />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden rounded-bl-2xl rounded-tl-2xl">
        {/* Content Area */}
        <div className="flex flex-1 min-h-0 min-w-0 w-full h-full">
          {/* Email List - Left Panel */}
          <div 
            className={`bg-white border border-gray-cool-100 h-full rounded-2xl shrink-0 overflow-hidden ${
              isAnimating ? 'transition-[width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''
            }`}
            style={{ width: leftPanelWidth }}
          >
            <EmailList />
          </div>
          
          {/* Resize Handle */}
          <ResizeHandle
            direction="horizontal"
            positionOffset={SIDEBAR_OFFSET}
            minValue={MIN_WIDTH}
            maxValue={MAX_WIDTH}
            onResize={handleResize}
            onResizeEnd={handleResizeEnd}
            onReset={handleReset}
          />
          
          {/* Main Content - Right Panel */}
          <div className="flex-1 bg-white border border-gray-cool-100 h-full min-h-0 min-w-0 rounded-2xl overflow-hidden relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

