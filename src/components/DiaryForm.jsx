import React, { useState } from 'react'



export const DiaryForm = ({mode, initialDiary, username, today, onSave, onCancel}) => {
    //mode write or edit
    //initialdiary 수정할 일기 새작성이면 없음
    //onSubmit 입력한 제목, 내용을 상위로 전달
    //목록으로 이동
    //여기에서는 입력중인 제목과 내용을 관리
    const  [form, setForm]= useState({title: "", content: "", ...initialDiary})
    //initialDiary는 부모가 전달한 이전 일기 상태


    const handleSubmit=(e)=>{ //제출함수는 폼안에서 검증하고 값을 전달하는 것까지만
        e.preventDefault();

        if(!form.title.trim() || !form.content.trim()){ //제목이나 내용중 하나라도 비어있으면 막기
            return
        }
        //dispatch(addDiaryAction({...form, id: crypto.randomUUID(), date:today, username: loggedInuser.username}))
        onSave(form)
        
        
    }
    return (
        <form onSubmit={handleSubmit} className="auth-box diary-write-box">
            {mode === "write" && (
                <p className="welcome-text"><strong>{username}</strong>님 환영합니다</p>
            )}
            <h3 className="auth-title">{mode === "write" ? "오늘의 일기를 입력해주세요" : "수정하기"}</h3>
            {mode === "write" && <p className="diary-date">{today}</p>}

            <input className="auth-input" placeholder="title" onChange={(e)=> setForm({...form, title:e.target.value})} value={form.title} />
            <textarea className="diary-textarea" placeholder="content" onChange={(e)=> setForm({...form, content:e.target.value})} value={form.content} />

            <div className="auth-buttons">
                <button type="submit" className="btn btn-primary">
                    {mode === "write" ? "저장하기" : "수정완료"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    {mode === "write" ? "목록보기" : "취소"}
                </button>
            </div>
        </form>
    )
}
