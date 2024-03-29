"use client";
import { Logout } from "@/app/auth/login/actions";
import { signOut } from "@/contexts/auth.reducer";
import { useAuth } from "@/hooks/useAuth.hook";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { USER_MENUS } from "../Header/constants";

export default function UserView() {
  const router = useRouter();
  const { user, dispatch } = useAuth();

  const handleActionMenu = async (action: string) => {
    switch (action) {
      case "sign_out": {
        const cacheTag = getCookie("token");
        await Logout(cacheTag?.toString() || "");
        dispatch(signOut());
        window.location.href = "/";
        break;
      }
      case "admin_dashboard": {
        router.push("/admin");
        break;
      }
      case "my_report": {
        router.push("/user/reports");
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className="group/item relative">
      <Avatar size="large" style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
      <div className="invisible absolute -right-1/4 mt-3 w-72 rounded-md bg-slate-100 px-3 py-2 text-black opacity-0 shadow-md transition-all group-hover/item:visible group-hover/item:opacity-100">
        <div className="rounded-md bg-secondary px-2 py-4 shadow-md">
          <div className="flex space-x-2">
            <Avatar size="large" style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
            <div>
              <p className="text-md font-medium">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
        <Divider className="my-2" />
        <div>
          {USER_MENUS(user?.role).map((menu) => (
            <div key={menu.action}>
              <Button
                onClick={() => handleActionMenu(menu.action)}
                size="large"
                type="text"
                className="w-full text-left"
                icon={menu.icon}
              >
                {menu.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
