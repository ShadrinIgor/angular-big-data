type ReportMetaColumnsTypes = 'entity' | 'metric';
type ReportMetaMetricTypes = 'money' | 'relative' | 'absolute';

interface ReportMetaColumns {
  type: ReportMetaColumnsTypes;
  key: string;
  primary?: boolean;
  metricType: ReportMetaMetricTypes;
  title: string;
}

interface ReportMetaTotal {
  impressions: number;
  clicks: number;
  ctr: number;
  installs: number;
  cr0: number;
  register: number;
  register_unique: number;
  cr1: number;
  ftd: number;
  ftd_unique: number;
  cr2: number;
  af_purchase: number;
  spent: number;
  revenue: number;
  roas: number;
  ecpi: number;
  arpu: number;
  cpt: number;
}

export interface ReportMeta {
  columns: ReportMetaColumns[];
  total: ReportMetaTotal;
}
