import { IApplicant } from "@/types/User";

export interface ApplicationListProps {
  applicantList: IApplicant[];
  handleStatusClick: (status: string, applicationId: string) => void;
  noticeId: string;
}
