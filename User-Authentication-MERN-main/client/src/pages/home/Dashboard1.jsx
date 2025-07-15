import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance1 from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import CreateSessionForm from "./CreateSessionForm";
import Modal from '../../components/Modal';
import moment from "moment";
import DeleteAlertContent from "../../components/DeleteAlertContent";

function Dashboard1() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance1.get(API_PATH.SESSIONS.GET_ALL);
      setSession(response.data);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      // Optional redirect on 401
      if (error?.response?.status === 401) {
        // localStorage.removeItem("token");
        // navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance1.delete(API_PATH.SESSIONS.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Failed to delete session");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 backdrop-blur-lg">
      <div className="container mx-auto pt-4 pb-4 px-8">
        {/* Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-gray-600 text-lg">
              Loading sessions...
            </div>
          ) : session.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No sessions found. Click "Add New" to get started.
            </div>
          ) : (
            session.map((data, index) => (
              <div
                key={data?._id}
                className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-2xl shadow-indigo-500/25"
              >
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => {
                    navigate(`/interview-prep/${data?._id}`);
                  }}
                  onDelete={() => {
                    setOpenDeleteAlert({ open: true, data });
                  }}
                />
              </div>
            ))
          )}
        </div>

        {/* Add New Session Button */}
        <button
          className="h-12 flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-2xl shadow-purple-500/25 backdrop-blur-lg fixed bottom-10 right-10"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white mr-2" /> Add New
        </button>

        {/* Create Session Modal */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
        >
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl shadow-indigo-500/25 rounded-xl p-4">
            <CreateSessionForm
              onSuccess={() => {
                fetchAllSessions();
                setOpenCreateModal(false);
              }}
            />
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert?.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          title="Delete Session"
        >
          <div className="w-[30vw] bg-white/80 backdrop-blur-lg shadow-2xl shadow-purple-500/25 rounded-xl p-4">
            <DeleteAlertContent
              content="Are you sure you want to delete this session?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard1;
