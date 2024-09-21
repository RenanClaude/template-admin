import useAuth from "@/data/hook/useAuth";
import Link from "next/link";

interface UserAvatarProps {
  className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Link href={"/perfil"}>
      <img src={user?.imageUrl ?? "images/avatar.svg"} alt="Avatar do usuário"
        className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`} />
    </Link>
  )
}