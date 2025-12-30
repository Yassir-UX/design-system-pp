import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tooltip } from '../components/ui/tooltip';
import { EmailRow } from '../components/ui/email-row';
import { EmailGroup } from '../components/ui/email-group';
import { SearchMd, FilterLines, Repeat04 } from '@untitledui/icons';

import type { LabelProps } from '../components/ui/label';
import type { AvatarInfo } from '@/types/email';

// Sample avatars with names
const avatarYassir: AvatarInfo = {
  id: 'user-1',
  src: 'https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg',
  name: 'Yassir UX'
};
const avatarMaria: AvatarInfo = {
  id: 'user-2',
  src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  name: 'Maria Chen'
};
const avatarAlex: AvatarInfo = {
  id: 'user-3',
  src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  name: 'Alex Johnson'
};
const avatarSara: AvatarInfo = {
  id: 'user-4',
  src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
  name: 'Sara Williams'
};

// Label to color mapping - each label type has a consistent color
const labelColorMap: Record<string, LabelProps['color']> = {
  'Marketing': 'purple',
  'Event': 'blue',
  'Newsletter': 'cyan',
  'Updates': 'success',
  'Support': 'warning',
  'Finance': 'teal',
  'HR': 'pink',
  'Product': 'indigo',
  'Design': 'brand',
  'Sales': 'orange',
};

// Helper to get label color
const getLabelColor = (label: string): LabelProps['color'] => {
  return labelColorMap[label] || 'gray';
};

// Sample email data
const todayEmails = [
  {
    id: '1',
    userName: 'James Chen',
    subject: 'Subjection line',
    preview: 'Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.',
    date: '4:52 PM',
    label: 'Marketing',
    isUnread: true,
  },
  {
    id: '2',
    userName: 'James Chen',
    threadCount: 4,
    subject: 'Request for feedback',
    preview: 'I appreciate the insights shared in our last meeting. Looking forward to your feedback on my proposal.',
    date: '4:45 PM',
    label: 'Design',
    avatars: [avatarYassir, avatarMaria],
    isUnread: true,
    showCommentIcon: true,
  },
  {
    id: '3',
    userName: 'James Chen',
    threadCount: 3,
    subject: 'Follow-up on tasks',
    preview: 'Just checking in on the progress of the tasks assigned last week. Let me know if you need any assistance.',
    date: '3:20 PM',
    label: 'Event',
    isUnread: true,
    showTaskIcon: true,
  },
];

const yesterdayEmails = [
  {
    id: '4',
    userName: 'James Chen',
    subject: 'Subjection line',
    preview: 'Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.',
    date: 'Jan 15',
    label: 'Newsletter',
    avatars: [avatarAlex],
  },
  {
    id: '5',
    userName: 'James Chen',
    subject: 'Request for feedback',
    preview: 'I appreciate the insights shared in our last meeting. Looking forward to your feedback on my proposal.',
    date: '3:03 AM',
    label: 'Marketing',
    isDraft: true,
  },
  {
    id: '6',
    userName: 'James Chen',
    subject: 'Follow-up on tasks',
    preview: 'Just checking in on the progress of the tasks assigned last week. Let me know if you need any assistance.',
    date: '2:54 AM',
    label: 'Updates',
    avatars: [avatarSara],
  },
];

const last7DaysEmails = [
  {
    id: '7',
    userName: 'James Chen',
    threadCount: 11,
    subject: 'Follow-up on tasks',
    preview: 'Just checking in on the progress of the tasks assigned last week. Let me know if you need any assistance.',
    date: 'Jan 22',
    label: 'Support',
    showCommentIcon: true,
  },
  {
    id: '8',
    userName: 'James Chen',
    subject: 'Feedback on Previous Workshop',
    preview: "Thank you for the reminder! I enjoyed the last workshop, and I'm looking forward to the next one!",
    date: 'Jan 15',
    label: 'Event',
  },
  {
    id: '9',
    userName: 'James Chen',
    subject: 'Feedback on Workshop Content',
    preview: 'The materials provided were very useful. However, some topics felt rushed.',
    date: 'Jan 15',
    label: 'Product',
  },
];

export default function InboxPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate initial data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  }, []);

  const handleSelectEmail = (emailId: string, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (selected) {
        next.add(emailId);
      } else {
        next.delete(emailId);
      }
      return next;
    });
  };

  const handleSelectAll = (ids: string[], selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (selected) {
        ids.forEach(id => next.add(id));
      } else {
        ids.forEach(id => next.delete(id));
      }
      return next;
    });
  };

  const handleEmailClick = (emailId?: string) => {
    if (emailId) {
      navigate(`/inbox/${emailId}`);
    }
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  // Show loading state
  const showLoading = isLoading || isRefreshing;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Email Header */}
      <div className="flex items-center justify-between p-xl shrink-0">
        {/* Search Bar */}
        <div className="flex items-center gap-md">
          <div className="w-[300px]">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              iconStart={<SearchMd size={20} />}
              inputSize="sm"
              shortcut="K"
            />
          </div>
          <Tooltip content="Filter" shortcut="F" side="right">
            <Button
              variant="tertiary-gray"
              size="sm"
              iconStart={<FilterLines size={20} />}
              className="h-[36px] w-[36px] p-0"
            />
          </Tooltip>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-md">
          <Tooltip content="Reload" shortcut="R" side="left">
            <Button
              variant="tertiary-gray"
              size="sm"
              iconStart={<Repeat04 size={20} className={isRefreshing ? "animate-spin" : ""} />}
              className="h-[36px] w-[36px] p-0"
              onClick={handleRefresh}
              disabled={isRefreshing}
            />
          </Tooltip>
          <Button
            variant="primary"
            size="sm"
            shortcut="N"
          >
            Create New
          </Button>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {showLoading ? (
          // Loading skeleton state
          <div className="flex flex-col">
            {/* Skeleton for today's emails */}
            {[1, 2, 3].map((i) => (
              <EmailRow
                key={`skeleton-today-${i}`}
                emailId={`skeleton-${i}`}
                isLoading={true}
                userName=""
                subject=""
                preview=""
                date=""
              />
            ))}
            
            {/* Skeleton group header - Yesterday */}
            <div className="flex items-center gap-md py-md px-md border-b border-gray-cool-100 bg-gray-cool-25">
              <div className="w-4 h-4 rounded-xs skeleton-shimmer" />
              <div className="w-20 h-4 rounded-sm skeleton-shimmer" />
            </div>
            
            {/* Skeleton for yesterday's emails */}
            {[1, 2, 3].map((i) => (
              <EmailRow
                key={`skeleton-yesterday-${i}`}
                emailId={`skeleton-y-${i}`}
                isLoading={true}
                userName=""
                subject=""
                preview=""
                date=""
              />
            ))}
            
            {/* Skeleton group header - Last 7 days */}
            <div className="flex items-center gap-md py-md px-md border-b border-gray-cool-100 bg-gray-cool-25">
              <div className="w-4 h-4 rounded-xs skeleton-shimmer" />
              <div className="w-24 h-4 rounded-sm skeleton-shimmer" />
            </div>
            
            {/* Skeleton for last 7 days emails */}
            {[1, 2, 3].map((i) => (
              <EmailRow
                key={`skeleton-week-${i}`}
                emailId={`skeleton-w-${i}`}
                isLoading={true}
                userName=""
                subject=""
                preview=""
                date=""
              />
            ))}
          </div>
        ) : (
          <>
            {/* Today's emails - no group header as it's obvious */}
            <div className="flex flex-col">
              {todayEmails.map((email) => (
                <EmailRow
                  key={email.id}
                  emailId={email.id}
                  variant={selectedIds.has(email.id) ? "selected" : email.isUnread ? "unread" : "default"}
                  userName={email.userName}
                  threadCount={email.threadCount}
                  subject={email.subject}
                  preview={email.preview}
                  date={email.date}
                  label={email.label}
                  labelColor={getLabelColor(email.label)}
                  avatars={email.avatars}
                  showTaskIcon={email.showTaskIcon}
                  showCommentIcon={email.showCommentIcon}
                  isSelected={selectedIds.has(email.id)}
                  onSelect={handleSelectEmail}
                  onRowClick={handleEmailClick}
                />
              ))}
            </div>

            {/* Yesterday's emails */}
            <EmailGroup
              dateLabel="Yesterday"
              itemIds={yesterdayEmails.map(e => e.id)}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
            >
              {yesterdayEmails.map((email) => (
                <EmailRow
                  key={email.id}
                  emailId={email.id}
                  variant={selectedIds.has(email.id) ? "selected" : "default"}
                  userName={email.userName}
                  subject={email.subject}
                  preview={email.preview}
                  date={email.date}
                  label={email.label}
                  labelColor={getLabelColor(email.label)}
                  avatars={email.avatars}
                  status={email.isDraft ? "draft" : undefined}
                  isSelected={selectedIds.has(email.id)}
                  onSelect={handleSelectEmail}
                  onRowClick={handleEmailClick}
                />
              ))}
            </EmailGroup>

            {/* Last 7 days emails */}
            <EmailGroup
              dateLabel="Last 7 days"
              itemIds={last7DaysEmails.map(e => e.id)}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
            >
              {last7DaysEmails.map((email) => (
                <EmailRow
                  key={email.id}
                  emailId={email.id}
                  variant={selectedIds.has(email.id) ? "selected" : "default"}
                  userName={email.userName}
                  threadCount={email.threadCount}
                  subject={email.subject}
                  preview={email.preview}
                  date={email.date}
                  label={email.label}
                  labelColor={getLabelColor(email.label)}
                  showCommentIcon={email.showCommentIcon}
                  isSelected={selectedIds.has(email.id)}
                  onSelect={handleSelectEmail}
                  onRowClick={handleEmailClick}
                />
              ))}
            </EmailGroup>
          </>
        )}
      </div>

      {/* Selection action bar - shows when emails are selected */}
      {selectedIds.size > 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-lg bg-gray-cool-800 border border-gray-cool-700 rounded-full py-md px-lg shadow-xl">
          <div className="flex items-center gap-md">
            <div className="size-[24px] rounded-full bg-blue-500/50 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-400">{selectedIds.size}</span>
            </div>
            <span className="text-sm font-medium text-gray-cool-300">Selected</span>
          </div>
          
          <div className="w-[1px] h-[25.5px] bg-gray-cool-700" />
          
          <button
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
            onClick={clearSelection}
          >
            Clear selection
          </button>
          
          <div className="w-[1px] h-[25.5px] bg-gray-cool-700" />
          
          <button
            className="px-lg py-md rounded-full bg-error-600/40 text-sm font-medium text-error-400 hover:bg-error-600/50"
            onClick={clearSelection}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
