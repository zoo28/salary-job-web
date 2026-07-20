import { useState, useEffect } from 'react';
import { NavLink } from '@lark-apaas/client-toolkit-lite';
import { BarChart3, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: '薪资预测', href: '#salary-predict' },
  { label: '技能规划', href: '#skill-planner' },
  { label: '决策助手', href: '#decision-helper' },
  { label: '数据看板', href: '#data-dashboard' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <NavLink
          to="#salary-predict"
          className="flex items-center gap-2 font-bold text-lg"
        >
          <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
            <BarChart3 className="size-5" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            薪资罗盘
          </span>
        </NavLink>

        {!isMobile && (
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button size="sm" className="shadow-lg shadow-primary/20">
              立即预测
            </Button>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          )}
        </div>
      </div>

      {isMobile && mobileOpen && (
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/40">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
