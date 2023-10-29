"use client";
import Link from "next/link";
import WhoOnline from "./components/WhoOnline";
import { useEffect, useState } from "react";
export interface pageProps {}

export default function Page({}: pageProps) {
  const [groups, setGroups] = useState<any>(null);

  useEffect(() => {
    (async function () {
      console.log("reeeeeeeeeeeeeeeee");
      const _allGroups = await (
        await fetch(`http://localhost/api/group/all`)
      ).json();
      console.log(_allGroups, "group fetch res");
      setGroups(_allGroups);
    })();
  }, []);
  return (
    <div className="flex flex-col items-center justify-around gap-10 mt-5">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-bold">Groups</h1>
        {groups?.map((g: any) => (
          <div key={g._id} className="">
            {
              <div className="mx-5 flex items-center bg-white border border-gray-100 rounded-lg shadow flex-row max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="object-cover rounded-t-lg h-auto w-1/5  rounded-none rounded-l-lg"
                  src={g.image}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {g.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {g.description}{" "}
                  </p>
                </div>
              </div>
            }
          </div>
        ))}
      </div>
      <WhoOnline />
    </div>
  );
}
