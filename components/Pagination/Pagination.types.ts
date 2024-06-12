export interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  type: string;
  noticeId?: string;
  onPageChange?: (page: number) => void;
}
