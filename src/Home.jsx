import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { auth, db } from "./components/Firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import send from "./assets/send.png";
import { Profile } from "./components/Profile";
import logo from "./assets/logo.svg";
import { GoogleGenAI } from "@google/genai";
import { AIMessage } from "./components/AIMessage";
import { UserMessage } from "./components/UserMessage";

export const Home = () => {
  const apikey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: apikey });
  const [userDetails, setUserDetails] = useState(null);
  const [postcontent, setPostContent] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const chatref = useRef(null);
  const heading = document.querySelector(".heading")

  async function main(prompt) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  }

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        toast.error("NOT LOGGED IN!");
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userDetails) {
        navigate("/login");
        toast.error("Please Login/Signup");
      }
    }, 4000); // 4 seconds timeout

    return () => clearTimeout(timeout); // Cleanup if component unmounts early
  }, [userDetails, navigate]);

  async function handleLogout() {
    try {
      await auth.signOut();
      toast.success("Logged Out");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
  };

  const showMenu = () => {
    menuRef.current?.classList.remove('hidden');
    menuRef.current?.classList.add('flex');
  };

  const hideMenu = () => {
    menuRef.current?.classList.remove('flex');
    menuRef.current?.classList.add('hidden');
  };
  useEffect(() => {
    if (chatref.current) {
      chatref.current.scrollTop = chatref.current.scrollHeight;
    }
  }, [messages]);
  
  const sendMessage = async () => {
    chatref.current?.classList.remove("hidden");
    heading.classList.add("hidden")

    if (!postcontent.trim()) return;
  
    const userMessage = { type: "user", content: postcontent };
    const loadingAIMessage = { type: "ai", content: "", isLoading: true };
  
    // Show user message and placeholder AI message
    setMessages((prev) => [...prev, userMessage, loadingAIMessage]);
    setPostContent("");
  
    // Get AI response
    const aiResponse = await main(postcontent);
  
    // Update the last AI message in the list
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { type: "ai", content: aiResponse, isLoading: false };
      return updated;
    });
  };
  

  return (
    <div>
      {userDetails ? (
        <>
          <section className="font-[Montserrat] bg-[#13141A] w-[100vw] h-[100vh] flex items-center flex-col">
            <Sidebar />
            <div className="fixed flex justify-between items-center ml-[50px] w-[1711px]">
              <div
                onClick={() => navigate("/")}
                className="flex scale-80 cursor-pointer justify-center pl-[10px] items-center gap-[13px]"
              >
                <img src={logo} alt="" />
                <p className="text-[64px] sel font-bold text-white font-['Montserrat']">
                  MukAI
                </p>
              </div>
              <Profile click={showMenu} letter={userDetails.username[0]} />
            </div>

            <div ref={chatref} className=" hidden chat scale-80 mt-[50px] w-[90%] h-[827px] flex flex-col overflow-y-auto scroll">
              {messages.map((message, index) => {
                if (message.type === "user") {
                  return <UserMessage key={index} letter={userDetails.username[0]} input={message.content} />;
                } else {
                  return <AIMessage key={index} output={message.content} />;
                }
              })}
            </div>

            <div className="heading flex flex-col justify-center items-center mt-[157px]">
              <h1 className="text-8xl font-bold text font-[Montserrat]">
                Hi, I am Muk
              </h1>
              <p className="text-[32px] font-semibold text2 ">
                At your service {userDetails.username}
              </p>
            </div>

            <div className="fixed top-[850px] w-[1084px] h-[100px] border-[0.5px] border-white rounded-[50px] flex items-center gap-[16px] scale-80">
              <button
                onClick={handleUploadClick}
                className="text-white ml-[10px] bg-[#D9D9D91A] w-[75px] h-[75px] 
                   rounded-[50%] border-[1px] border-white font-semibold 
                   text-5xl text-center hover:brightness-80 cursor-pointer"
              >
                +
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <textarea
                className="flex justify-center pt-[32px] resize-none focus:outline-none text-[20px] items-center text-white font-semibold bg-transparent h-[100%] w-[880px]"
                placeholder="Ask me something..."
                value={postcontent}
                onKeyDown={(e) => {
                  if(e.key === "Enter" && !e.shiftKey){
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
              <button
                onClick={sendMessage}
                className="text-white bg-[#D9D9D91A] w-[75px] h-[75px] rounded-[50%] border-[1px] border-white font-semibold text-5xl flex justify-center items-center hover:brightness-80 cursor-pointer"
              >
                <img src={send} alt="" />
              </button>
            </div>
          </section>

          <div ref={menuRef} className='hidden w-[300px] h-[100vh] animate-fade-left animate-duration-[300ms] bg-[#232530] fixed top-0 right-0 justify-between items-center flex-col p-7'>
            <button className="text-white font-bold fixed left-4 bg-[#07D4DFBF] rounded-[100%] w-[40px] h-[40px] cursor-pointer hover:bg-[#07D4DF]" onClick={hideMenu}>X</button>
            <div className="flex flex-col justify-center items-center gap-4">
              <Profile letter={userDetails.username[0]} />
              <h1 className="text-[14px] text-white font-bold ">{userDetails.username}</h1>
              <h1 className="text-[14px] text-white font-bold ">{userDetails.email}</h1>
            </div>
            <button onClick={handleLogout} className="bg-[#07D4DFBF] hover:bg-[#07D4DF] mt-[10px] cursor-pointer font-['Montserrat'] text-center text-[20px] font-bold text-white w-[90%] h-[65px] rounded-[13px]">
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <p className="bg-[#13141A] w-[100vw] h-[100vh] text-4xl text-white font-bold flex justify-center items-center flex-col gap-[20px]">
          Loading..
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </p>
      )}
    </div>
  );
};
