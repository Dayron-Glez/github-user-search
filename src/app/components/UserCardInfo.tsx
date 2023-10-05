import Glogo from "@/app/components/icons/GLogo";
import LocationIcon from "./icons/LocationIcon";
import ShareIcon from "./icons/ShareIcon";
import BuildingIcon from "./icons/BuildingIcon";
import TwitterIcon from "./icons/TwitterIcon";
import { User } from "../interfaces/user";
import Image from "next/image";

interface Props {
  user: User | null
}
function validateUrl (url:string) {
  if(!/^https:\/\//i.test(url)) {
    url = "https://" + url
  }
  return url
}

const UserCardInfo = ({user}: Props) => {
  return (
    <article className="grid-areas rounded-xl dark:bg-blue-900 shadow-md dark:shadow-none bg-white dark:text-white text-black p-2">
      <div className="grid section-logo rounded-full bg-gray-200 h-24 w-24 place-content-center p-1 mr-3 lg:mx-auto">
        {/* <Glogo className="relative top-2 h-full w-full" /> */}
        <Image
          src={user?.avatar_url!}
          width={96}
          height={96}
          alt={`profile image user ${user?.name}`}
          className="rounded-full"
        />
      </div>

      <div className="section-title">
        <h2 className="font-bold text-3xl">{user?.name}</h2>
        <p className="text-blue-500 ">@{user?.login}</p>
      </div>
      <p className="section-date lg:text-right">{new Date(user?.created_at || '').toLocaleString('es',{
        year:'numeric',
        month: 'long',
        day:'numeric'
      })}</p>
      <p className="section-description mt-8 px-2 leading-loose">
       {user?.bio}
      </p>

      <div className="section-number flex justify-around bg-blue-50 dark:bg-blue-950 rounded-lg p-8  mt-4 text-center dark:text-white text-blue-950">
        <article>
          <p>Repos</p>
          <p className="font-bold text-xl">{user?.public_repos}</p>
        </article>
        <article>
          <p>Followers</p>
          <p className="font-bold text-xl">{user?.followers}</p>
        </article>
        <article>
          <p>Following</p>
          <p className="font-bold text-xl">{user?.following}</p>
        </article>
      </div>
      <div className="section-social md:grid md:grid-cols-2 mt-4 space-y-3">
        <article className="flex space-x-2">
          <i><LocationIcon className="h-full w-full dark:fill-white fill-blue-950" width={"1.2rem"}/></i>
          <p>{user?.location || 'no location'}</p>
        </article>
        <article className="flex space-x-2">
          <i><ShareIcon className="h-full w-full dark:fill-white fill-blue-950" width={"1.2rem"}/></i>
          <a className="truncate" href={validateUrl(user?.blog!)}>{user?.blog || 'no blog'}</a>
        </article>
        <article className="flex space-x-2">
          <i><TwitterIcon className="h-full w-full dark:fill-white fill-blue-950" width={"1.2rem"}/></i>
          <p>{user?.twitter_username || 'not aviable'} </p>
        </article>
        <article className="flex space-x-2">
          <i><BuildingIcon className="h-full w-full dark:fill-white fill-blue-950" width={"1.2rem"}/></i>
          <p>{user?.company || 'no company'}</p>
        </article>
      </div>
    </article>
  );
};

export default UserCardInfo;
