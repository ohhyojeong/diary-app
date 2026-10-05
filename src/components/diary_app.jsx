import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./diary_app.css"

const Diary_app = ({ setLoggedInUser, loggedInUser }) => {
    
    //삭제, 내용 수정하기

    const navigate = useNavigate()
    
    useEffect(() => {
        if (!loggedInUser) {
        navigate("/");
        }
    }, [loggedInUser, navigate]);



    const [diarys, setDiarys] =useState(()=> {const saveDiarys = localStorage.getItem("diarys");
                            return saveDiarys ? JSON.parse(saveDiarys) : ([{title:"React공부하기", content:"1일차", date:"2026-10-04"},])})
    const [formdiary, setFormDiary]=useState({title:"", content:"", date:""}); //입력하는 창
    const [seldiary, setSelDiary]=useState(null); //선택된 Diary
    const [today, setToday]= useState("")
    const [page, setPage] = useState("write");
    
    useEffect(()=>{
                localStorage.setItem("diarys", JSON.stringify(diarys)) 
    },[diarys])
    
    
    useEffect(() => { //컴포넌트가 처음 렌더링될 때 날짜, 시간을 today1에 저장
        const now=new Date(); //코드가 실행되는 순간의 날짜와 시간을 담은 객체를 만들어 now에 저장
        setToday(`${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,"0")}-${now.getDate().toString().padStart(2,"0")}`)
        
    }, [formdiary]);  

    

    const addDiary=(e)=>{
        e.preventDefault()
        if(formdiary.title && formdiary.content){
            const newDiary= {...formdiary, date: today} //오늘의 날짜로 새다이어리에 추가
            setDiarys([...diarys, newDiary])
            alert("저장되었습니다")
            setPage("list")
        }
        setFormDiary({title:"", content:""})
    }
    const DeleteDiary=(diaryDate)=>{
        setDiarys(diarys.filter((diary)=> diary.date !== diaryDate))
    }


    const SelectDiary=(diary)=>{//수정버튼 누를떄 수정모드로 바꾸고 선택된 다이어리전달
        setPage("Modi")
        setSelDiary(diary) 
        

    }
    const ModiDiary=(e)=>{
        e.preventDefault()
        if (page==="Modi"){
         // 수정모드안에서 수정함수 불러내기
        
        setDiarys(
        diarys.map((i) =>
            i.date === seldiary.date
            ? { ...i, title: seldiary.title, content: seldiary.content }: i)
        )
    }
}

    const DetailDiary=(i)=>{
        setSelDiary(i)
        setPage("detail")

    }

    if (!loggedInUser) {
        return null;
    }

    return (
    <div className="diary-container">
    

        {page === "write" ? (
        <form onSubmit={addDiary} className="auth-box diary-write-box">
            <p className="welcome-text"><strong>{loggedInUser.username}</strong>님 환영합니다</p>
            <h3 className="auth-title">오늘의 일기를 입력해주세요</h3>
            <p className="diary-date">{today}</p>

            <input
            className="auth-input"
            placeholder="title"
            value={formdiary.title}
            onChange={(e) => setFormDiary({ ...formdiary, title: e.target.value }) }
            />
            <textarea
            className="diary-textarea"
            placeholder="content"
            value={formdiary.content}
            onChange={(e) => setFormDiary({ ...formdiary, content: e.target.value })}
            />

            <div className="auth-buttons">
            <button type="submit" className="btn btn-primary">저장하기</button>
            <button type="button" className="btn btn-secondary" onClick={() => setPage("list")}>목록보기</button>
            </div>
        </form>

        ) : page === "list" ? (
        <div className="auth-box diary-list-box">
            <h3 className="auth-title">내 일기 목록</h3>

            <ul className="diary-list">
            {diarys.map((diary) => (
                <li key={diary.date} className="diary-item">
                <div className="diary-item-info" onClick={() => DetailDiary(diary)}>
                    <span className="diary-item-title">{diary.title}</span>
                    <span className="diary-item-date">{diary.date}</span>
                </div>
                <div className="diary-item-actions">
                    <button className="btn-small" onClick={() => SelectDiary(diary)}>수정</button>
                    <button className="btn-small btn-danger" onClick={() => DeleteDiary(diary.date)}>삭제</button>
                </div>
                </li>
            ))}
            </ul>

            <div className="auth-buttons">
            <button className="btn btn-primary" onClick={() => setPage("write")}>새 일기 쓰기</button>
            <button className="btn btn-secondary" onClick={() => setLoggedInUser(null)}>로그아웃</button>
            </div>
        </div>

        ) : page === "Modi" ? (
        <form onSubmit={ModiDiary} className="auth-box diary-write-box">
            {/* Modi 모드일 때 */}
            <h3 className="auth-title">수정하기</h3>
            
            {/* <input onChange={(e)=>setSelDiary({...seldiary, date:e.target.value})} value={seldiary.date}/> */}


            <input
            className="auth-input"
            placeholder="title"
            value={seldiary.title}
            onChange={(e) => setSelDiary({ ...seldiary, title: e.target.value })}
            />
            <textarea
            className="diary-textarea"
            placeholder="content"
            value={seldiary.content}
            onChange={(e) => setSelDiary({ ...seldiary, content: e.target.value })}
            />

            <div className="auth-buttons">
            <button type="submit" className="btn btn-primary">수정완료</button>
            <button type="button" className="btn btn-secondary" onClick={() => setPage("list")}>취소</button>
            </div>
        </form>

        ) : (
        <div className="auth-box diary-detail-box">
            {/* detail 모드일 때 */}
            <h3 className="diary-detail-title">{seldiary.title}</h3>
            <p className="diary-date">{seldiary.date}</p>
            <p className="diary-detail-content">{seldiary.content}</p>

            <div className="auth-buttons">
            <button className="btn btn-secondary" onClick={() => setPage("list")}>목록보기</button>
            </div>
        </div>
        )}
    </div>
    );}

export default Diary_app