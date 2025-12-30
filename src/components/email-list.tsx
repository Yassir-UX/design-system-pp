import { 
  Inbox01, 
  Edit04, 
  CheckCircle, 
  Copy03,
  GridDotsOuter,
  Cryptocurrency01
} from '@untitledui/icons';
import { NavItem } from './ui/nav-item';
import { Select, Account } from './ui/select';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Avatar image
const avatarImg = 'https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg';

interface SectionDividerProps {
  label: string;
}

function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-md w-full">
      <span className="text-xs font-medium text-gray-cool-300 shrink-0">
        {label}
      </span>
      <div className="grow h-[1px] bg-gray-cool-100" />
    </div>
  );
}

const accounts: Account[] = [
  { id: '1', name: 'Personal', email: 'personal@email.com' },
  { id: '2', name: 'Work', email: 'work@company.com' },
  { id: '3', name: 'Team', email: 'team@company.com' },
];

export default function EmailList() {
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>(accounts);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current path matches
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col gap-[14px] p-xl h-full overflow-y-auto">
      {/* Account Select */}
      <Select
        selectedAccounts={selectedAccounts}
        accounts={accounts}
        onAccountChange={setSelectedAccounts}
        multiSelect
        selectSize="sm"
      />

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-cool-100" />

      {/* Navigation Items */}
      <div className="flex flex-col gap-lg w-full">
        {/* Main Nav Items */}
        <div className="flex flex-col gap-xxs w-full">
          <NavItem 
            icon={<Inbox01 size={19} />} 
            label="Inbox" 
            shortcut="B"
            shortcutShowCommand={false}
            isActive={isActive('/inbox') || isActive('/')}
            onClick={() => navigate('/inbox')}
          />
          <NavItem 
            icon={<Cryptocurrency01 size={19} />} 
            label="Assigned to me"
            isActive={isActive('/assigned')}
            onClick={() => navigate('/assigned')}
          />
          <NavItem 
            icon={<Edit04 size={19} />} 
            label="Drafts"
            isActive={isActive('/drafts')}
            onClick={() => navigate('/drafts')}
          />
          <NavItem 
            icon={<CheckCircle size={19} />} 
            label="Done"
            isActive={isActive('/done')}
            onClick={() => navigate('/done')}
          />
          <NavItem 
            icon={<Copy03 size={19} />} 
            label="Views"
            isActive={isActive('/views')}
            onClick={() => navigate('/views')}
          />
        </div>

        {/* Favorites Section */}
        <SectionDivider label="Favorites" />
        
        <NavItem 
          icon={<GridDotsOuter size={19} />} 
          label="Approval needed"
          isActive={isActive('/approval')}
          onClick={() => navigate('/approval')}
        />

        {/* Teams Section */}
        <SectionDivider label="Teams" />

        {/* Team Members - using NavItem with avatar variant */}
        <div className="flex flex-col w-full">
          <NavItem label="Yassir UX" avatarUrl={avatarImg} />
          <NavItem label="Maria" showAvatarPlaceholder />
          <NavItem label="Liam" showAvatarPlaceholder />
        </div>
      </div>
    </div>
  );
}

