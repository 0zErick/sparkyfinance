import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import TabBar from "@/components/layout/TabBar";
import DashboardView from "@/components/views/DashboardView";
import TasksView from "@/components/views/TasksView";
import ExpensesView from "@/components/views/ExpensesView";
import DocsView from "@/components/views/DocsView";
import MembersView from "@/components/views/MembersView";
import ChatView from "@/components/views/ChatView";
import { syncLocalDataOwner } from "@/lib/userLocalData";
import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => (
  <div className="space-y-4 px-4 pt-6">
    <Skeleton className="h-10 w-40 mx-auto" />
    <Skeleton className="h-6 w-60 mx-auto" />
    <Skeleton className="h-32 w-full rounded-2xl" />
    <Skeleton className="h-48 w-full rounded-2xl" />
    <Skeleton className="h-24 w-full rounded-2xl" />
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.2, ease: "easeIn" as const } },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [ready, setReady] = useState(false);
  const [, setTick] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isDemo = localStorage.getItem("sparky-demo-mode") === "true";
    if (isDemo) {
      setReady(true);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && !localStorage.getItem("sparky-demo-mode")) {
        navigate("/login");
      } else if (session?.user) {
        syncLocalDataOwner(session.user.id);
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !localStorage.getItem("sparky-demo-mode")) {
        navigate("/login");
      } else if (session?.user) {
        syncLocalDataOwner(session.user.id);
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
    const scrollContainer = document.querySelector('[data-main-scroll]');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  };

  // Register global callback for chat back button
  useEffect(() => {
    (window as any).__sparkyGoHome = () => handleTabChange("home");
    return () => { delete (window as any).__sparkyGoHome; };
  }, []);

  if (!ready) return (
    <div className="bg-background relative mx-auto flex w-full max-w-lg flex-col lg:max-w-4xl xl:max-w-6xl" style={{ height: '100dvh' }}>
      <PageSkeleton />
    </div>
  );

  const renderView = () => {
    switch (activeTab) {
      case "home": return <DashboardView />;
      case "tasks": return <TasksView />;
      case "chat": return <ChatView />;
      case "expenses": return <ExpensesView />;
      case "docs": return <DocsView />;
      case "members": return <MembersView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div
      className="bg-background relative mx-auto flex w-full max-w-lg flex-col lg:max-w-4xl xl:max-w-6xl"
      style={{
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        paddingTop: activeTab === 'chat' ? '0' : 'env(safe-area-inset-top, 20px)',
        overflow: 'hidden',
        overscrollBehavior: 'none',
      }}
    >
      <div data-main-scroll className={`relative flex-1 min-h-0 overflow-x-hidden ${activeTab === 'chat' ? 'overflow-hidden' : 'overflow-y-auto'}`} style={{ overscrollBehavior: 'none', paddingBottom: activeTab === 'chat' ? '0' : 'calc(100px + env(safe-area-inset-bottom, 0px))' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="will-change-transform"
            style={{ minHeight: activeTab === 'chat' ? '100%' : undefined }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
      {activeTab !== 'chat' && <TabBar activeTab={activeTab} onTabChange={handleTabChange} />}
    </div>
  );
};

export default Index;
