import Image from 'next/image';
import { getUserDetail } from '~lib/login';

export default async function Avatar({ uid }: { uid: number }) {
  const userData = await getUserDetail(uid);
  const data = userData as unknown as IUserDetail;
  const size = 22;
  return (
    <Image
      src={data?.profile.avatarUrl!}
      alt={data?.profile.nickname!}
      width={size}
      height={size}
      className="rounded-full shadow-lg my-0"
    />
  );
}
