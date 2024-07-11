import { useLocalSearchParams } from "expo-router";

import UserListForm from "@/src/components/User/UserList/UserListForm";

const Page = () => {
  const { id: groupId } = useLocalSearchParams<{ id: string }>();

  return <UserListForm groupId={groupId} />;
};

export default Page;
