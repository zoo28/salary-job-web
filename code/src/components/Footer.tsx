import { BarChart3, Shield, FileText, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground">
                <BarChart3 className="size-5" />
              </div>
              <span>薪资罗盘</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              基于真实爬取的 IT/大数据岗位数据，提供薪资预测、技能规划与城市决策辅助。
              数据仅供参考，实际薪资以企业 offer 为准。
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="size-3.5" />
              <span>数据样本：大数据 3,210 条 · IT 1,188 条</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">数据说明</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <FileText className="size-3.5" />
                <span>数据采集自主流招聘平台</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="size-3.5" />
                <span>覆盖全国 20 个主要城市</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="size-3.5" />
                <span>定期更新，保持数据时效</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">联系我们</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-3.5" />
                <span>2370736171@qq.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30" />
      </div>
    </footer>
  );
}
