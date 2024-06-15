export interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  type: string;
  noticeId?: string;
  keyword?: string;
  onPageChange?: (page: number) => void;
}
