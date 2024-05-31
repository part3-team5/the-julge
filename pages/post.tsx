import React from "react";
import Post from "@/components/Post";

// 컴포넌트 확인을 위한 임시 페이지
const PostPage = () => {
    return (
        <>
            <Post startsAt={"2024-06-30T00:00:00Z"} workhour={10} />
            <Post startsAt={"2023-06-30T00:00:00Z"} workhour={5} />
        </>
    );
};

export default PostPage;
