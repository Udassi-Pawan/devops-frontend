const dynamic = "force-dynamic";
import Link from "next/link";
import WhoOnline from "./components/WhoOnline";
export interface pageProps {}

export default async function Page({}: pageProps) {
  let _allGroups;
  try {
    console.log("group request");
    _allGroups = await (
      await fetch(`api/group/all`, { cache: "no-store" })
    ).json();
    console.log("received group data", _allGroups);
  } catch (e) {}
  return (
    <div className="flex flex-col items-center justify-around gap-10 mt-5">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-bold">Groups</h1>
        {_allGroups?.map((g: any) => (
          <div key={g._id} className="">
            {
              <Link href={`/group/${g._id}`}>
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
                </div>{" "}
              </Link>
            }
          </div>
        ))}
      </div>
      <WhoOnline />
    </div>
  );
}

export const revalidate = 1;
