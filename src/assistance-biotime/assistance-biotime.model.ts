interface AssistanceBiotimeModel {
  id: number;
  emp_code: string;
  punch_time: string;
  punch_state: string;
  verify_type: number;
  work_code: string;
  terminal_sn: string;
  terminal_alias: string;
  area_alias: string;
  longitude: number | null;
  latitude: number | null;
  gps_location: string | null;
  mobile: string | null;
  source: number;
  purpose: number;
  crc: string;
  is_attendance: boolean | null;
  reserved: string | null;
  upload_time: string;
  sync_status: string | null;
  sync_time: string | null;
  is_mask: boolean | null;
  temperature: number | null;
  emp_id: number;
  terminal_id: number;
}
