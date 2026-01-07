export type User = {
  user_id: string;
  name: string;
  title?: string;
  role?: string;
};

export type Department = {
  department_id: string;
  name: string;
};

export type ProjectStatus = "Draft" | "Active" | "Review" | "Approved" | "Locked";
export type ProjectType = "ML" | "TimeSeries" | "Scorecard" | "AI";

export type Project = {
  project_id: string;
  project_name: string;
  project_type: ProjectType;
  status: ProjectStatus;
  owner: User;
  governance_manager: User | null;
  department: Department;
  is_segmented: boolean;
  objectives: string;
  created_at: string;
  updated_at: string;
};

export type ColumnRole = "lookup" | "time_id" | "exog" | "endog" | "not_used";

export type Column = {
  column_id: string;
  column_name: string;
  display_name: string;
  data_type: "string" | "datetime" | "numeric" | "categorical" | "boolean";
  role: ColumnRole;
};

export type CheckpointType = "raw_upload" | "user_manual" | "development_gate" | "validation_gate" | "production";

export type TableVersion = {
  table_version_id: string;
  version_number: number;
  row_count: number;
  column_count: number;
  is_materialized: boolean;
  checkpoint_type: CheckpointType | null;
  checkpoint_name?: string;
  parent_version_id?: string | null;
  created_at: string;
  created_by: string;
};

export type ProjectTable = {
  project_table_id: string;
  table_name: string;
  display_name: string;
  table_type: "source" | "derived";
  current_version_id: string;
  versions: TableVersion[];
  columns: Column[];
};

export type OperationInputParameters = Record<string, any>;

export type Operation = {
  operation_log_id: string;
  operation_type: "column_action" | "table_action" | "table_operation";
  operation_name: string;
  input_parameters: OperationInputParameters;
  executed_by: User;
  execution_timestamp: string;
  affected_table: string;
  output_table_version: string | null;
};

export type ApprovalType = "DevCompletion" | "ValidationStart" | "ValidationCompletion" | "ProductionApproval";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export type Approval = {
  approval_id: string;
  approval_type: ApprovalType;
  status: ApprovalStatus;
  approver: User;
  requested_by?: User;
  created_at?: string;
  approved_at?: string;
  comments: string | null;
};

export type ComplianceChecklist = {
  checklist_id: string;
  template_name: string;
  status: "not_started" | "in_progress" | "Completed";
  completion_percentage: number;
  total_items: number;
  completed_items: number;
  assigned_to: User;
  completed_at?: string;
};

export type Stakeholder = User;

export type Governance = {
  approvals: Approval[];
  compliance_checklist: ComplianceChecklist | null;
  stakeholders: Stakeholder[];
};

export type TableRec = {
    child_table: string;
    parent_table: string;
    parent_type: string;
}

export type TableLineage = TableRec[];
