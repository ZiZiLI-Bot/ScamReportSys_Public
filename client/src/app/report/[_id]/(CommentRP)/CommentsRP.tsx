"use client";

import { useAuth } from "@/hooks/useAuth.hook";
import { TReport_comment } from "@/lib/Types";
import { TParamAPI, TRes } from "@/utils/Http";
import { CL_Http } from "@/utils/Http/Http.client";
import { Button, Divider, Empty, Form, Input, Modal, Skeleton, Tooltip } from "antd";
import dayjs from "dayjs";
import qs from "qs";
import { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import useSWR, { mutate } from "swr";

const TIME_FORMAT = "HH:mm DD/MM/YYYY";

type TCommentsRP = {
  reportId: string;
};

const rulesComment = [
  {
    required: true,
    message: "Vui lòng nhập bình luận của bạn!",
  },
];

const fetcher = async (url: string) => CL_Http.get(url).then((res) => res.data);

export default function CommentsRP({ reportId }: TCommentsRP) {
  const { isAuthenticated, user } = useAuth();
  const [modal, contextHolder] = Modal.useModal();
  const initParams: TParamAPI = {
    page: "1",
    limit: "10",
    sort: "desc",
    report: reportId,
  };

  const [params, setParams] = useState<TParamAPI>(initParams);
  const url = `/report_comments?${qs.stringify(params)}`;
  const { data, isLoading, error } = useSWR<TRes<TReport_comment[]>>(url, fetcher);

  const comments = data?.data;

  const handleComment = async (value: { comment: string }) => {
    const body = {
      comment: value.comment,
      user: user?.user_id,
      report: reportId,
    };
    const { data: res } = await CL_Http.post<TRes<TReport_comment>>("/report_comments", body);
    if (res.success) {
      mutate(url);
    }
  };

  const handleVote = async (type: "upvote" | "downvote", listVote: string[], commentId: string) => {
    const body = {
      [type]: listVote.includes(user?.user_id || "")
        ? listVote.filter((item) => item !== user?.user_id)
        : [...listVote, user?.user_id || ""],
    };
    const { data: res } = await CL_Http.patch<TRes<TReport_comment>>(`/report_comments/${commentId}`, body);
    if (res.success) {
      mutate(url);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const { data: res } = await CL_Http.delete<TRes<TReport_comment>>(`/report_comments/${commentId}`);
    if (res.success) {
      mutate(url);
    }
  };

  return (
    <div>
      {contextHolder}
      <h2 className="mb-2 text-xl font-medium">Comments:</h2>
      {isAuthenticated ? (
        <div className="flex w-full space-x-3">
          <Form onFinish={handleComment} className="w-full">
            <Form.Item rules={rulesComment} name="comment" className="w-full">
              <Input size="large" placeholder="Viết Bình luận của bạn về báo cáo này" />
            </Form.Item>
            <div className="flex justify-end">
              <Button htmlType="submit" size="large" type="primary">
                Bình luận
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <p>Bạn cần đăng nhập để bình luận</p>
      )}
      <Divider />
      <div className="flex flex-col space-y-3">
        {isLoading && (
          <div className="flex flex-col space-y-3">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
        {error && <p>Đã có lỗi xảy ra</p>}
        {comments?.length === 0 ? (
          <Empty description="Chưa có bình luận nào" />
        ) : (
          comments?.map((item) => (
            <div
              key={item._id}
              className="group/comment min-h-8 w-full rounded-md border p-4 transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="mb-2 flex items-center space-x-1">
                  <span className="text-md font-bold text-primary">
                    {item.user.firstName} {item.user.lastName}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-md font-bold text-gray-500">{dayjs(item.createdAt).format(TIME_FORMAT)}</span>
                </div>
                {user?.user_id === item.user._id && (
                  <Tooltip title="Xóa bình luận">
                    <FaRegTrashAlt
                      onClick={() =>
                        modal.confirm({
                          title: "Xóa bình luận",
                          content: "Bạn có chắc chắn muốn xóa bình luận này?",
                          onOk: () => handleDeleteComment(item._id),
                        })
                      }
                      className="cursor-pointer text-red-600 opacity-0 transition-opacity duration-300 group-hover/comment:opacity-100"
                    />
                  </Tooltip>
                )}
              </div>
              <p>{item.comment}</p>
              <div className="mt-2 flex items-center space-x-2">
                <Tooltip title="Up vote">
                  <Button
                    type="text"
                    onClick={() => handleVote("upvote", item.upvote, item._id)}
                    icon={
                      <BiUpvote
                        className={`mb-1 inline ${item.upvote.includes(user?.user_id || "") ? "text-primary" : "text-gray-500"}`}
                      />
                    }
                    size="small"
                  >
                    {" "}
                    {item.upvote.length}
                  </Button>
                </Tooltip>
                <Tooltip title="Down vote">
                  <Button
                    type="text"
                    onClick={() => handleVote("downvote", item.downvote, item._id)}
                    icon={
                      <BiDownvote
                        className={`inline ${item.downvote.includes(user?.user_id || "") ? "text-primary" : "text-gray-500"}`}
                      />
                    }
                    size="small"
                  >
                    {" "}
                    {item.downvote.length}
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
