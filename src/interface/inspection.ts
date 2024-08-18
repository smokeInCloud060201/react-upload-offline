interface Inspection {
    id: string;
    inspector: Inspector;
    inspection_type: string;
    is_sppo_in_tbm: boolean | null;
    is_camera_set_up_and_functioning: boolean | null;
    is_comply_to_no_smoking_rule: boolean | null;
    status: string;
}

interface Company {
    id: string;
    company_name: string;
}

interface Contract {
    id: string;
    contract_no: string;
    company: Company;
    contract_expiry: string;
    start_date: string;
    is_under_contractor_performance_ms: boolean;
    sppos: {
        id: string;
        iam_id: string;
        email: string;
        mobile: string;
        name: string;
    }[];
    groups: any[]
}

interface Section {
    id: string;
    parent: Section | null;
    name: string;
    short_name: string | null;
    group_type: string;
    is_main: boolean;
}

interface Supervisor {
    id: string;
    name: string;
    email: string;
    company: Company;
    status: string;
    section: Section;
    contact_number: string;
    status_updated_date: string;
    status_updated_by: string;
    section_admin_name: string | null;
    contract_details: any | null; // You can refine this type based on the actual data structure
}

interface ContractorAdmin {
    id: string;
    email: string;
    contact_no: string;
    contractor_name: string;
    company: Company;
}

interface WorkNature {
    id: string;
    name: string;
    parent_id: string | null;
    file: {
        original_name: string;
        extension_type: string;
        id: string;
    } | null;
    placeholder: string | null;
    unit: string | null;
}

interface WorkNatureGroup {
    work_nature: WorkNature;
    is_checked: boolean;
    custom_value: string | null;
    children: WorkNatureGroup[];
}

interface Worksite {
    id: string;
    start_work_date_time: string;
    end_work_date_time: string;
    contract: Contract;
    section: Section;
    sppos: {
        id: string;
        iam_id: string;
        email: string;
        mobile: string;
        name: string;
    };
    supervisor: Supervisor;
    contractor_admin: ContractorAdmin;
    longitude: string;
    latitude: string;
    location: string;
    zone: string;
    description: string;
    contractor_name: string;
    is_on_premise: boolean;
    status: string;
    auth0Role: string;
    needed_action: boolean;
}

interface WorkdayInspection {
    inspections: Inspection[];
    id: string;
    status: string;
    project_officer: ProjectOfficer;
    worksite: Worksite;
    start_time: string;
    night_work: boolean,
    work_natures: WorkNatureGroup[];
}


interface Inspector {
    id: string;
    name: string;
    email: string;
    phone: string;
    isInternal: boolean;
    iam_id: string;
    inspector_role: string;
}

interface ProjectOfficer {
    id: string;
    iam_id: string;
    email: string;
    mobile: string;
    name: string;
}

interface InspectionQuestionItem {
    id: string;
    content: string;
    inspection_category: string;
    question_order: number;
    is_minor: boolean;
}

interface InspectionQuestionData {
    SP_REQUIREMENTS: InspectionQuestionItem[];
    GENERAL_SAFETY: InspectionQuestionItem[];
    MACHINERY: InspectionQuestionItem[];
    WORKING_AT_HEIGHT: InspectionQuestionItem[];
    LIFTING: InspectionQuestionItem[];
    FIRE_SAFETY: InspectionQuestionItem[];
    FORKLIFT: InspectionQuestionItem[];
    MATERIAL_STORAGE: InspectionQuestionItem[];
}
