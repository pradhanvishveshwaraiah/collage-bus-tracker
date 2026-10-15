export type UserRole = 'student' | 'teacher' | 'others';

export interface StudentFormData {
  fullName: string;
  gmailId: string;
  usn: string;
}

export interface TeacherFormData {
  teacherName: string;
  department: string;
  teacherId: string;
}

export interface OthersFormData {
  fullName: string;
  staffId: string;
  designation: 'Clerk' | 'College Administrator' | 'Subordinate Staff' | 'Bus Staff' | 'Other' | '';
}

export interface UserSession {
  role: UserRole;
  fullName: string;
  identifier: string; // USN for student, Teacher ID for teacher, Staff ID for others
  identifierLabel: string;
  secondaryInfo?: {
    label: string;
    value: string;
  };
  email?: string;
  loginTime: string;
}
