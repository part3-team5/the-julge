export interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  type: string;
  noticeId?: string;
}
