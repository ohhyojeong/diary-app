import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addDiary as addDiaryAction,
  deleteDiary as deleteDiaryAction,
  updateDiary as updateDiaryAction,
} from "../store/diarySlice";

import "../style/diary_app.css"
import { useState, useEffect } from "react";

import { DiaryDetail } from "./DiaryDetail";
import { DiaryForm } from "./DiaryForm";
import { DiaryList } from "./DiaryList";
import { logoutAction } from "../store/authSlice";


//데이터와 화면 전환을 관리하는 역할
//Redux의 전체 일기 조회와 사용자별 필터링
//추가, 수정, 삭제 dispatch
//page 작성, 목록, 수정, 상세 중 현재화면
//저장 관련 useEffect
const Diary_app = () => {
    const loggedInUser = useSelector((state) => state.auth.user);

    //삭제, 내용 수정하기
    const allDiarys= useSelector ((state)=> state.diary.items); //모든 사용자의 일기
    const diarys = allDiarys.filter((diary)=> loggedInUser && diary.username ===loggedInUser.username)


    const dispatch = useDispatch(); //상태를 변경하는 액션보내기

    const [seldiary, setSelDiary]=useState(null); //선택된 Diary
    const [today, setToday]= useState("")
    const [page, setPage] = useState("write");
    
    const navigate = useNavigate()
    
    useEffect(() => { //로그인한 유저가 null일떄
        if (!loggedInUser) {
        navigate("/");
        }
    }, [loggedInUser, navigate]);


    
    useEffect(()=>{
                if (!loggedInUser) return;
                localStorage.setItem("diarys", JSON.stringify(allDiarys)) 
    },[allDiarys, loggedInUser])
    
    
    useEffect(() => { //컴포넌트가 처음 렌더링될 때 날짜, 시간을 today1에 저장
        const now=new Date(); //코드가 실행되는 순간의 날짜와 시간을 담은 객체를 만들어 now에 저장
        setToday(`${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,"0")}-${now.getDate().toString().padStart(2,"0")}`)
        
    }, []);  

    

    const addDiary=(values)=>{

        if (!values.title.trim() || !values.content.trim()){
            return;
        }

        dispatch(addDiaryAction({...values, id: crypto.randomUUID(), date:today, username: loggedInUser.username
        }))
        setPage("list") //추가한 다음에 목록보여주기
    }
    const DeleteDiary=(diaryId)=>{
        dispatch(deleteDiaryAction(diaryId));
    };

    const SelectDiary=(diary)=>{//수정버튼 누를떄 수정모드로 바꾸고 선택된 다이어리전달
        setSelDiary(diary) 
        setPage("edit")
    }

    const ModiDiary = (values) => {
        dispatch(updateDiaryAction({...seldiary, ...values}));
        setPage("list"); //수정한 다음에 목록 보여주기
        };

    const DetailDiary=(i)=>{
        setSelDiary(i)
        setPage("detail")
    }

    
    const logout=()=>{
        dispatch(logoutAction())
        navigate("/")
    }

    if (!loggedInUser) {
        return null;
    }
    
    return (
    <div className="diary-container">
        {/*page는 list, detail, write*/}
        {page === "list" && <DiaryList diarys={diarys} onDetail={DetailDiary} onEdit={SelectDiary} onDelete={DeleteDiary} onWrite={()=>setPage("write")} onLogout={logout} />  }
        {page === "detail" && <DiaryDetail onBack={() => setPage("list")} diary={seldiary}/>  }
        {(page === "write" || page === "edit") && (<DiaryForm
            key={page === "write" ? "new" : seldiary.id}
            mode={page === "write" ? "write" : "edit"}
            initialDiary={page === "write" ? null : seldiary}
            username={loggedInUser.username}
            today={today}
            onSave={page === "write" ? addDiary : ModiDiary}
            onCancel={() => setPage("list")}
        />  )}


    </div>
    )}

export default Diary_app
