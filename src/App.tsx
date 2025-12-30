import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ShortcutProvider } from './lib/shortcuts';
import { CommandPalette } from './components/ui/command';
import { ActionToaster } from './components/ui/action-toast';
import ColdDashboard from './pages/cold-dashboard';
import InboxPage from './pages/inbox';
import AssignedPage from './pages/assigned';
import DraftsPage from './pages/drafts';
import DonePage from './pages/done';
import ViewsPage from './pages/views';
import ApprovalPage from './pages/approval';
import EmailDetailPage from './pages/email-detail';

// Helper to determine layout type from path
function getLayoutType(pathname: string): 'detail' | 'list' {
  const pathSegments = pathname.split('/').filter(Boolean);
  return pathSegments.length >= 2 ? 'detail' : 'list';
}

function AppRoutes() {
  const location = useLocation();
  const [layoutKey, setLayoutKey] = useState(() => getLayoutType(location.pathname));

  // Update layout key when location changes
  useEffect(() => {
    const newLayoutType = getLayoutType(location.pathname);
    if (newLayoutType !== layoutKey) {
      setLayoutKey(newLayoutType);
    }
  }, [location.pathname, layoutKey]);

  return (
    <Routes location={location} key={layoutKey}>
      {/* Email detail pages - standalone layout with 3 boxes */}
      <Route path="/inbox/:emailId" element={<EmailDetailPage />} />
      <Route path="/assigned/:emailId" element={<EmailDetailPage />} />
      <Route path="/drafts/:emailId" element={<EmailDetailPage />} />
      <Route path="/done/:emailId" element={<EmailDetailPage />} />
      
      {/* Main dashboard layout */}
      <Route path="/" element={<ColdDashboard />}>
        <Route index element={<Navigate to="/inbox" replace />} />
        <Route path="inbox" element={<InboxPage />} />
        <Route path="assigned" element={<AssignedPage />} />
        <Route path="drafts" element={<DraftsPage />} />
        <Route path="done" element={<DonePage />} />
        <Route path="views" element={<ViewsPage />} />
        <Route path="approval" element={<ApprovalPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ShortcutProvider>
        <AppRoutes />
        {/* Global command palette - opens with Cmd+K */}
        <CommandPalette />
        {/* Global action toaster for email actions */}
        <ActionToaster />
      </ShortcutProvider>
    </BrowserRouter>
  );
}

export default App;
