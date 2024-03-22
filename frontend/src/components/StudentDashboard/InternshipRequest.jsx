import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { getDemandsSuccess } from "../../store/reducers/demands.slice";
import { useSelector } from "react-redux";

const InternshipRequest = () => {
  const dispatch = useDispatch();
  const { demands } = useSelector((state) => state.demands);
  const { student } = useSelector((state) => state.student);
  const [addBtn, setAddBtn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/student/demand/${student._id}`
        );
        console.log("studentDemands:", response.data.demand);
        dispatch(getDemandsSuccess(response.data.demand));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, student._id]);

  return (
    <div className="w-[calc(100vw-18.5rem)] ">
      <div className="cursor-pointer font-bold text-center bg-green-900 mb-2 ml-auto py-2 px-5 rounded-lg w-fit">
        <button
          onClick={() => {
            setAddBtn((prev) => !prev);
          }}
        >
          Add Demand
        </button>
      </div>
      {addBtn ? (
        <div className=" bg-[#130A1D] m-5 p-6 rounded-xl transition duration-700">
          <form className="flex items-center justify-between space-x-5">
            <div className="flex items-center justify-center space-x-5">
              <div className="flex items-center justify-center space-x-5">
                <label className="text-gray-200 font-bold">
                  Name Enterprise
                </label>
                <input
                  className="w-96 h-10 px-3 text-base text-white placeholder-slate-300 bg-[#493066]  rounded-lg focus:shadow-outline"
                  type="text"
                  placeholder="Name Enterprise"
                />
              </div>
              <div className="flex items-center justify-center space-x-5">
                <label className="text-gray-200 font-bold">Email</label>
                <input
                  className="w-96 h-10 px-3 text-base text-white placeholder-slate-300 bg-[#493066] rounded-lg focus:shadow-outline"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer font-bold text-center bg-green-900  py-2 px-8 rounded-lg"
            >
              Add
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      <table className="min-w-full bg-[#130A1D] rounded-xl border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase">
              Name Enterprise
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase">
              Demand State
            </th>
          </tr>
        </thead>
        <tbody>
          {demands ? (
            demands.map((demand) => (
              <tr key={demand._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {demand.name_enterprise}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{demand.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {demand.accepted ? "accepted" : "waiting"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">No demands found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InternshipRequest;
