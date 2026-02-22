import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  allContacts: [], //Stores list of all user you can chat eg:-  [{ _id: 1, name: "harsh" },{ _id: 2, name: "Riya" }]
  chats: [],       // Stores people you already chatted with
  messages: [],    // Stores messages of selected chat eg:- [{ text: "Hello", sender: "me" },{ text: "Hi", sender: "Riya" }]
  activeTab: "chats", // Controls which tab is open. Maybe you have:chats ,contacts So this decides which ui to show 
  selectedUser: null, // this stores the person you are currently chatting with if null no chat open
  isUsersLoading: false, // Used when fetching contacts or chats from backend. if true show loader spinner
  isMessagesLoading: false, //Used when fetching messages.

//   Read value from browser localStorage
//  Convert it from string to boolean because local storage stores everthing as string
//  If true → sound enabled
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {   // If sound = true: !true → false , Save false in localStorage, Update Zustand state to false , Now sound disabled.
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  //If you call: setActiveTab("contacts"); then activeTab = "contacts" than UI re-renders automatically.
  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  }));

