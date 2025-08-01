import React, { useEffect, useMemo, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";

// Type definition
type User = {
  name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  qualification?: string;
  college?: string;
  passing_year?: string;
  skills?: string 
  last_company?: string;
  experience?: string;
  avatarUrl?: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editData, setEditData] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErr("You're not logged in.");
          setLoading(false);
          return;
        }
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const skills = useMemo(() => {
    if (!user?.skills) return [];
    if (Array.isArray(user.skills)) return user.skills.filter(Boolean);
    return String(user.skills)
      .split(/[\,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [user]);

  if (loading)
    return <div className="p-10 text-center text-gray-600 text-lg">Loading profile...</div>;
  if (err) return <div className="p-10 text-red-500 text-center text-lg">{err}</div>;
  if (!user) return null;

  const openModal = () => {
    setEditData(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="relative rounded-3xl border bg-white shadow-md hover:shadow-lg transition-all">
          <div className="h-28 bg-gradient-to-r from-green-400 to-green-600 rounded-t-3xl" />
          <div className="px-6 pb-6">
            <div className="-mt-12 flex items-end gap-4">
              <img
                src={
                  user.avatarUrl ||
                  `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                    user.name || "U"
                  )}`
                }
                alt="avatar"
                className="h-24 w-24 rounded-full ring-4 ring-white object-cover shadow-md"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {user.name}
                  <PencilIcon
                    onClick={openModal}
                    className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  />
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 rounded-3xl border bg-white shadow-sm">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-sm font-semibold uppercase text-gray-600">Personal Info</h2>
              <PencilIcon
                onClick={openModal}
                className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
              />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone" value={user.phone} />
              <Field label="DOB" value={formatDate(user.dob)} />
              <Field label="Qualification" value={user.qualification} />
              <Field label="College" value={user.college} />
              <Field label="Passing Year" value={user.passing_year} />
            </div>
          </section>

          <aside className="rounded-3xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-sm font-semibold uppercase text-gray-600">Skills</h2>
                <PencilIcon
                  onClick={openModal}
                  className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                />
              </div>

              <div className="p-6">
                {(() => {
                  let parsedSkills: string[] = [];

                  if (typeof skills === 'string') {
                    try {
                      // Parse the JSON string: '["Java", "JS"]'
                      parsedSkills = JSON.parse(skills);
                    } catch (error) {
                      console.error("Failed to parse skills string:", error);
                    }
                  } else if (Array.isArray(skills)) {
                    parsedSkills = skills;
                  }

                  return parsedSkills && parsedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {parsedSkills.map((s, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No skills added.</p>
                  );
                })()}
              </div>
            </aside>

          <section className="lg:col-span-3 rounded-3xl border bg-white shadow-sm">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-sm font-semibold uppercase text-gray-600">Professional Info</h2>
              <PencilIcon
                onClick={openModal}
                className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
              />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Last Company" value={user.last_company} />
              <Field label="Experience" value={user.experience} />
            </div>
          </section>
        </div>
      </div>

      {/* Modal Section (unchanged) */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                    Edit Profile
                  </Dialog.Title>

                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const token = localStorage.getItem("token");
                        const res = await axios.put(
                          "http://localhost:5000/api/profile",
                          editData,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        setUser(res.data);
                        setIsModalOpen(false);
                      } catch (error) {
                        alert("Failed to update profile.");
                      }
                    }}
                  >
                    {["name", "phone", "dob", "qualification", "college", "passingYear"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm text-gray-600 capitalize mb-1">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={(editData as any)?.[field] || ""}
                          onChange={(e) =>
                            setEditData((prev) => ({ ...prev, [field]: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-lg border text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}

                    <div className="flex justify-end pt-4 gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm rounded border text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="space-y-1">
    <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900">{value?.trim() || "-"}</p>
  </div>
);

function formatDate(d?: string) {
  if (!d) return "-";
  try {
    const parsed = new Date(d);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return d;
  } catch {
    return d;
  }
}

export default Profile;
