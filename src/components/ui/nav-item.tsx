import { cn } from '@/lib/utils';
import React, { useEffect, useId } from 'react';
import { Avatar } from './avatar';
import { Shortcut } from './shortcut';
import { useShortcuts, type ShortcutAction } from '@/lib/shortcuts';

interface NavItemProps {
  /** The label text for the nav item */
  label: string;
  /** Icon element to display (mutually exclusive with avatar) */
  icon?: React.ReactElement;
  /** Avatar image URL (mutually exclusive with icon) */
  avatarUrl?: string;
  /** Placeholder avatar (shows user icon when no avatarUrl) */
  showAvatarPlaceholder?: boolean;
  /** Whether this item is currently active/selected */
  isActive?: boolean;
  /** Keyboard shortcut to display */
  shortcut?: string;
  /** Whether to show the command (⌘) icon with the shortcut */
  shortcutShowCommand?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Group name for command palette organization */
  shortcutGroup?: string;
  /** Additional class names */
  className?: string;
}

export function NavItem({ 
  label, 
  icon, 
  avatarUrl, 
  showAvatarPlaceholder,
  isActive = false, 
  shortcut,
  shortcutShowCommand = true,
  onClick,
  shortcutGroup = 'Navigation',
  className 
}: NavItemProps) {
  const id = useId();
  const { register, unregister } = useShortcuts();
  
  // Determine if we're showing an avatar or icon
  const showAvatar = avatarUrl || showAvatarPlaceholder;

  // Clone icon with correct color based on isActive state
  const styledIcon = icon ? React.cloneElement(icon, {
    className: cn(
      icon.props.className,
      isActive ? 'text-gray-cool-900' : 'text-gray-cool-400'
    )
  }) : null;

  // Clone icon for command palette (always use the muted color)
  const paletteIcon = icon ? React.cloneElement(icon, {
    className: 'text-gray-cool-400',
    size: 20
  }) : null;

  // Register shortcut when component mounts
  useEffect(() => {
    if (!shortcut || !onClick) return;

    const shortcutAction: ShortcutAction = {
      id: `nav-${id}`,
      label,
      key: shortcut,
      withMeta: shortcutShowCommand,
      action: onClick,
      group: shortcutGroup,
      icon: paletteIcon,
    };

    register(shortcutAction);
    return () => unregister(`nav-${id}`);
  }, [id, shortcut, label, shortcutShowCommand, onClick, shortcutGroup, register, unregister]);

  return (
    <div 
      className={cn(
        'flex items-center gap-md px-lg py-md rounded-sm w-full cursor-pointer transition-colors',
        isActive 
          ? 'bg-blue-dark-100' 
          : 'hover:bg-gray-cool-50',
        className
      )}
      onClick={onClick}
    >
      {showAvatar ? (
        // Avatar variant using Avatar component
        <Avatar 
          size="xs" 
          src={avatarUrl} 
          alt={label}
        />
      ) : (
        // Icon variant
        <div className="shrink-0 size-[19px] flex items-center justify-center">
          {styledIcon}
        </div>
      )}
      <span 
        className={cn(
          'text-sm grow',
          showAvatar ? 'font-normal text-gray-cool-900' : 'font-medium text-gray-cool-700'
        )}
      >
        {label}
      </span>
      {shortcut && (
        <Shortcut 
          keys={shortcut} 
          theme="light" 
          showCommand={shortcutShowCommand}
        />
      )}
    </div>
  );
}

export default NavItem;
